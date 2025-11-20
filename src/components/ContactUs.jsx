import { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ContactUs = () => {
  const [formState, setFormState] = useState({
    submitting: false,
    success: false,
    error: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState({ submitting: true, success: false, error: false });

    const form = e.target;
    const formData = new FormData(form);

    // Check if we're in development mode
    const isDevelopment =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    try {
      if (isDevelopment) {
        // Simulate form submission in development
        console.log(
          "Form data (development mode):",
          Object.fromEntries(formData)
        );
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
        setFormState({ submitting: false, success: true, error: false });
        form.reset();
        setTimeout(() => {
          setFormState({ submitting: false, success: false, error: false });
        }, 5000);
        return;
      }

      // Production: Submit to Netlify
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      });

      if (response.ok) {
        setFormState({ submitting: false, success: true, error: false });
        form.reset();
        // Reset success message after 5 seconds
        setTimeout(() => {
          setFormState({ submitting: false, success: false, error: false });
        }, 5000);
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      setFormState({ submitting: false, success: false, error: true });
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

    // Create SplitText instance for the content
    const contact_split = SplitText.create(
      ["#contact_heading_title", "#contact_heading_description"],
      {
        type: "lines",
        mask: "lines",
        linesClass: "line",
      }
    );

    // Set initial state for lines
    gsap.set(contact_split.lines, {
      opacity: 0,
      y: 30,
    });

    // Animate in lines with stagger
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
                      719 602 5511
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
              name="contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="space-y-4 sm:space-y-6 poppins-regular"
            >
              {/* Hidden field for Netlify Forms */}
              <input type="hidden" name="form-name" value="contact" />

              {/* Honeypot field for spam protection */}
              <p className="hidden">
                <label>
                  Don't fill this out if you're human:{" "}
                  <input name="bot-field" />
                </label>
              </p>

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
                    className="w-full p-3  cursor-pointer text-sm md:text-base sm:text-base border border-custom input-bg-custom focus:outline-none focus:ring-2 focus:ring-secondary-custom"
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
                  className="w-full h-28 sm:h-32 p-3 sm:p-4 text-sm md:text-base sm:text-base border border-custom input-bg-custom resize-none focus:outline-none focus:ring-2 focus:ring-secondary-custom"
                  placeholder="Tell us about your requirements"
                ></textarea>
              </div>

              {formState.success && (
                <div className="p-4 text-sm text-center text-green-800 bg-green-100 border border-green-400 rounded-md">
                  Thank you! Your message has been sent successfully. We'll
                  contact you within 24 hours.
                </div>
              )}

              {formState.error && (
                <div className="p-4 text-sm text-center text-red-800 bg-red-100 border border-red-400 rounded-md">
                  Sorry, there was an error submitting your form. Please try
                  again or contact us directly.
                </div>
              )}

              <button
                type="submit"
                disabled={formState.submitting}
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
