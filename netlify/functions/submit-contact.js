// Netlify Function to verify Cloudflare Turnstile and submit contact form
export async function handler(event) {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const formData = JSON.parse(event.body);
    const turnstileToken = formData["cf-turnstile-response"];

    // STEP 1: Save to backup form FIRST (contact-all) - captures all leads
    const backupFormData = new URLSearchParams();
    backupFormData.append("form-name", "contact-all");
    backupFormData.append("firstName", formData.firstName);
    backupFormData.append("lastName", formData.lastName);
    backupFormData.append("email", formData.email);
    backupFormData.append("phoneNumber", formData.phoneNumber);
    backupFormData.append("businessType", formData.businessType);
    backupFormData.append("message", formData.message);
    backupFormData.append("verificationStatus", "pending");

    // Submit to backup form (don't wait for response, fire and forget)
    fetch(`${process.env.URL}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: backupFormData.toString(),
    }).catch((err) => console.log("Backup form submission error:", err));

    // STEP 2: Verify Turnstile token with Cloudflare
    const turnstileResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: turnstileToken,
          remoteip:
            event.headers["x-forwarded-for"] || event.headers["client-ip"],
        }),
      },
    );

    const turnstileResult = await turnstileResponse.json();

    if (!turnstileResult.success) {
      console.log("Turnstile verification failed:", turnstileResult);
      // Lead is already saved in backup form, but reject this submission
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Bot verification failed. Please try again.",
        }),
      };
    }

    // STEP 3: Turnstile verified - submit to main contact form
    const netlifyFormData = new URLSearchParams();
    netlifyFormData.append("form-name", "contact");
    netlifyFormData.append("firstName", formData.firstName);
    netlifyFormData.append("lastName", formData.lastName);
    netlifyFormData.append("email", formData.email);
    netlifyFormData.append("phoneNumber", formData.phoneNumber);
    netlifyFormData.append("businessType", formData.businessType);
    netlifyFormData.append("message", formData.message);

    // Submit to verified contact form
    const netlifyResponse = await fetch(`${process.env.URL}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: netlifyFormData.toString(),
    });

    if (netlifyResponse.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: "Form submitted successfully",
        }),
      };
    } else {
      throw new Error("Netlify form submission failed");
    }
  } catch (error) {
    console.error("Form submission error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "An error occurred. Please try again." }),
    };
  }
}
