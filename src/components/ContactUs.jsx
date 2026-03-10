import { useState, useRef, useEffect } from "react";
import { MapPin, Phone, Mail, X, CheckCircle } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ContactUs = () => {
  // Cloudflare Turnstile Site Key
  const TURNSTILE_SITE_KEY = "0x4AAAAAACl5UPLIheWTpm7h";

  const [formState, setFormState] = useState({
    submitting: false,
    success: false,
    error: false,
  });
  const [turnstileToken, setTurnstileToken] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const formRef = useRef(null);
  const turnstileRef = useRef(null);
  const turnstileWidgetId = useRef(null);

  // Render Cloudflare Turnstile widget
  useEffect(() => {
    const renderTurnstile = () => {
      if (
        window.turnstile &&
        turnstileRef.current &&
        !turnstileWidgetId.current
      ) {
        turnstileWidgetId.current = window.turnstile.render(
          turnstileRef.current,
          {
            sitekey: TURNSTILE_SITE_KEY,
            callback: (token) => setTurnstileToken(token),
            "expired-callback": () => setTurnstileToken(null),
            "error-callback": () => setTurnstileToken(null),
          },
        );
      }
    };

    if (window.turnstile) {
      renderTurnstile();
    } else {
      window.onTurnstileLoad = renderTurnstile;
    }

    return () => {
      if (turnstileWidgetId.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetId.current);
        turnstileWidgetId.current = null;
      }
      delete window.onTurnstileLoad;
    };
  }, [TURNSTILE_SITE_KEY]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!turnstileToken) {
      setFormState({ submitting: false, success: false, error: true });
      return;
    }

    const form = e.target;
    setFormState({ submitting: true, success: false, error: false });

    try {
      const formData = new URLSearchParams();
      formData.append("form-name", "contact");
      formData.append("firstName", form.firstName.value);
      formData.append("lastName", form.lastName.value);
      formData.append("email", form.email.value);
      formData.append("phoneNumber", form.phoneNumber.value);
      formData.append("businessType", form.businessType.value);
      formData.append("message", form.message.value);
      formData.append("cf-turnstile-response", turnstileToken);

      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });

      if (response.ok) {
        setFormState({ submitting: false, success: true, error: false });
        setShowConfirmation(true);
        form.reset();

        // Reset Turnstile widget
        if (window.turnstile && turnstileWidgetId.current) {
          window.turnstile.reset(turnstileWidgetId.current);
          setTurnstileToken(null);
        }
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setFormState({ submitting: false, success: false, error: true });
      // Still show confirmation popup on error so visitor has contact info
      setShowConfirmation(true);
    }
  };

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#contact-section",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    const contact_split = SplitText.create(
      ["#contact_heading_title", "#contact_heading_description"],
      {
        type: "lines",
        mask: "lines",
        linesClass: "line",
      },
    );

    gsap.set(contact_split.lines, {
      opacity: 0,
      y: 30,
    });

    tl.to(contact_split.lines, {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power2.out",
    });
  }, []);

  return (
    <section
      id="contact-section"
      className="py-12 sm:py-16 bg-light-custom text-custom"
    >
      {/* Confirmation Pop-up Modal */}
      {showConfirmation && (
        <div style={{position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 2147483647}}>
          <div className="relative w-full max-w-md p-8 bg-white rounded-lg shadow-2xl">
            <button
              onClick={() => setShowConfirmation(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mb-4" />

              <h2 className="text-2xl font-semibold mb-4 bebas-neue-regular heading-custom">
                Thank You!
              </h2>

              <p className="text-sm md:text-base poppins-regular text-gray-700 mb-6 leading-relaxed">
                Thank you for contacting HB Suites. Sometimes we have
                technological glitches and we want to hear from you! If you
                would like to schedule a showing today or have questions about
                HB Suites, please contact Christine directly at{" "}
                <a
                  href="tel:7199853062"
                  className="font-semibold text-black hover:underline"
                >
                  719.985.3062
                </a>{" "}
                or{" "}
                <a
                  href="mailto:hbsuitesco@gmail.com"
                  className="font-semibold text-black hover:underline"
                >
                  hbsuitesco@gmail.com
                </a>
              </p>

              <div className="w-full space-y-2 text-sm poppins-regular text-gray-600 border-t pt-4">
                <div className="flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4 text-secondary-custom" />
                  <span>719.985.3062</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4 text-secondary-custom" />
                  <span>hbsuitesco@gmail.com</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4 text-secondary-custom" />
                  <span>1819 N Circle Drive, Colorado Springs, CO 80909</span>
                </div>
              </div>

              <button
                onClick={() => setShowConfirmation(false)}
                className="mt-6 w-full px-6 py-3 text-sm font-semibold text-white bg-black hover:bg-black/90 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex items-center justify-center mb-8 sm:mb-12">
          <div className="max-w-3xl w-full">
            <h1
              id="contact_heading_title"
              className="text-4xl font-light leading-tight text-center heading-custom bebas-neue-regular md:text-4xl lg:text-5xl"
            >
              Ready to Elevate Your Business?
            </h1>
            <p
              id="contact_heading_description"
              className="mt-2 text-base md:text-lg text-center sm:text-lg poppins-regular wrap-break-word"
            >
              Contact HB Suites today to discover how our luxury furnished
              office spaces can provide the professional environment your
              business deserves.
            </p>
          </div>
        </div>

        <div className="grid items-start gap-8 lg:gap-12 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="h-full px-4 py-6 space-y-6 sm:px-6 sm:py-8 bg-dull-custom">
            <div>
              <h3 className="mb-6 text-xl md:text-2xl sm:text-2xl font-semibold heading-custom bebas-neue-regular">
                Get in Touch
              </h3>

              <div className="space-y-6 poppins-regular">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-secondary-custom" />
                  </div>
                  <div className="text-sm md:text-base sm:text-base">
                    <h4 className="font-semibold heading-custom">Location</h4>
                    <p className="mt-1">
                      1819 N Circle Drive
                      <br />
                      Colorado Springs, CO
                      <br />
                      80909
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-secondary-custom" />
                  </div>
                  <div className="text-sm md:text-base sm:text-base">
                    <h4 className="font-semibold heading-custom">Phone</h4>
                    <p className="mt-1">
                      719.985.3062
                      <br />
                      Mon - Fri: 8:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-secondary-custom" />
                  </div>
                  <div className="text-sm md:text-base sm:text-base">
                    <h4 className="font-semibold heading-custom">Email</h4>
                    <p className="mt-1">hbsuitesco@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-6 border rounded-lg sm:p-8 bg-light-custom border-custom">
            <h3 className="mb-3 text-xl md:text-2xl sm:text-2xl font-semibold heading-custom bebas-neue-regular">
              Schedule Your Tour Today
            </h3>
            <p className="mb-6 text-sm md:text-base sm:text-base poppins-regular">
              Experience our luxury furnished office suites firsthand. Fill out
              the form below and we'll contact you within 24 hours.
            </p>

            <form
              ref={formRef}
              name="contact"
              method="POST"
              data-netlify="true"
              onSubmit={handleSubmit}
              className="space-y-4 sm:space-y-6 poppins-regular"
            >
              {/* Required hidden field for Netlify Forms */}
              <input type="hidden" name="form-name" value="contact" />

              <div>
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-sm md:text-base font-medium"
                >
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  minLength="2"
                  maxLength="50"
                  pattern="[A-Za-z\s'-]{2,}"
                  title="Please enter a valid first name (letters only, 2+ characters)"
                  className="w-full p-3 sm:p-4 text-sm md:text-base sm:text-base border border-custom input-bg-custom focus:outline-none focus:ring-2 focus:ring-secondary-custom"
                  placeholder="Enter your first name"
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm md:text-base font-medium"
                >
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  minLength="2"
                  maxLength="50"
                  pattern="[A-Za-z\s'-]{2,}"
                  title="Please enter a valid last name (letters only, 2+ characters)"
                  className="w-full p-3 sm:p-4 text-sm md:text-base sm:text-base border border-custom input-bg-custom focus:outline-none focus:ring-2 focus:ring-secondary-custom"
                  placeholder="Enter your last name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm md:text-base font-medium"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full p-3 sm:p-4 text-sm md:text-base sm:text-base border border-custom input-bg-custom focus:outline-none focus:ring-2 focus:ring-secondary-custom"
                  placeholder="Enter your email address"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block mb-2 text-sm md:text-base font-medium"
                  >
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    required
                    pattern="[0-9+() -]{7,}"
                    className="w-full p-3 sm:p-4 text-sm md:text-base sm:text-base border border-custom input-bg-custom focus:outline-none focus:ring-2 focus:ring-secondary-custom"
                    placeholder="Example: (555) 123-4567"
                  />
                </div>
                <div>
                  <label
                    htmlFor="businessType"
                    className="block mb-2 text-sm md:text-base font-medium"
                  >
                    Business Type *
                  </label>
                  <select
                    id="businessType"
                    name="businessType"
                    required
                    className="w-full p-3 cursor-pointer text-sm md:text-base sm:text-base border border-custom input-bg-custom focus:outline-none focus:ring-2 focus:ring-secondary-custom"
                  >
                    <option value="">Select your business type</option>
                    <option value="hairstylist">Hairstylist</option>
                    <option value="esthetician">Esthetician</option>
                    <option value="massage_therapist">Massage Therapist</option>
                    <option value="nail_tech">Nail Technician</option>
                    <option value="cosmetologist">Cosmetologist</option>
                    <option value="barber">Barber</option>
                    <option value="spa_therapist">Spa Therapist</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm md:text-base font-medium"
                >
                  Comment or Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  minLength="10"
                  maxLength="1000"
                  className="w-full h-28 sm:h-32 p-3 sm:p-4 text-sm md:text-base sm:text-base border border-custom input-bg-custom resize-none focus:outline-none focus:ring-2 focus:ring-secondary-custom"
                  placeholder="Tell us about your requirements (minimum 10 characters)"
                ></textarea>
              </div>

              {formState.error && (
                <div className="p-4 text-sm text-center text-red-800 bg-red-100 border border-red-400 rounded-md">
                  There was an issue submitting the form. Please try again or
                  contact Christine directly at 719.985.3062 or
                  hbsuitesco@gmail.com
                </div>
              )}

              {/* Cloudflare Turnstile Widget */}
              <div ref={turnstileRef} className="flex justify-center"></div>

              <button
                type="submit"
                disabled={formState.submitting || !turnstileToken}
                className="w-full px-6 py-3 text-sm md:text-base sm:text-base font-semibold text-white transition-colors bg-black hover:bg-black/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formState.submitting ? "Submitting..." : "Schedule Your Tour"}
              </button>

              <p className="text-xs md:text-sm sm:text-sm text-center text-gray-600">
                * Required fields. We respect your privacy and will never share
                your information.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
