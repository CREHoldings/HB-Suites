import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const ContactUs = () => {
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
          <div className="max-w-3xl">
            <h1
              id="contact_heading_title"
              className="text-3xl font-light leading-tight text-center heading-custom bebas-neue-regular md:text-4xl lg:text-5xl"
            >
              Ready to Elevate Your Business?
            </h1>
            <p
              id="contact_heading_description"
              className="mt-2 text-base md:text-lg text-center sm:text-lg poppins-regular"
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
                      Premium Business District
                      <br />
                      Professional Office Complex
                      <br />
                      Downtown Area
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
                      (555) 123-4567
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
                    <p className="mt-1">
                      info@hbsuites.com
                      <br />
                      leasing@hbsuites.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-secondary-custom" />
                  </div>
                  <div className="text-sm md:text-base sm:text-base">
                    <h4 className="font-semibold heading-custom">
                      Business Hours
                    </h4>
                    <p className="mt-1">
                      Monday - Friday: 8:00 AM - 6:00 PM
                      <br />
                      Saturday: 9:00 AM - 4:00 PM
                      <br />
                      Sunday: By Appointment
                    </p>
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

            <div className="space-y-4 sm:space-y-6 poppins-regular">
              <div>
                <label className="block mb-2 text-sm md:text-base font-medium">
                  First Name *
                </label>
                <input
                  type="text"
                  className="w-full p-3 sm:p-4 text-sm md:text-base sm:text-base border border-custom input-bg-custom focus:outline-none focus:ring-2 focus:ring-secondary-custom"
                  placeholder="Enter your first name"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm md:text-base font-medium">
                  Last Name *
                </label>
                <input
                  type="text"
                  className="w-full p-3 sm:p-4 text-sm md:text-base sm:text-base border border-custom input-bg-custom focus:outline-none focus:ring-2 focus:ring-secondary-custom"
                  placeholder="Enter your last name"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm md:text-base font-medium">
                  Email *
                </label>
                <input
                  type="email"
                  className="w-full p-3 sm:p-4 text-sm md:text-base sm:text-base border border-custom input-bg-custom focus:outline-none focus:ring-2 focus:ring-secondary-custom"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm md:text-base font-medium">
                  Comment or Message *
                </label>
                <textarea
                  className="w-full h-28 sm:h-32 p-3 sm:p-4 text-sm md:text-base sm:text-base border border-custom input-bg-custom resize-none focus:outline-none focus:ring-2 focus:ring-secondary-custom"
                  placeholder="Tell us about your requirements"
                ></textarea>
              </div>

              <button
                className="w-full px-6 py-3 text-sm md:text-base sm:text-base font-semibold text-white transition-colors bg-black hover:bg-black/90"
                onClick={() =>
                  alert("Contact form functionality would be implemented here")
                }
              >
                Schedule Your Tour
              </button>

              <p className="text-xs md:text-sm sm:text-sm text-center text-gray-600">
                * Required fields. We respect your privacy and will never share
                your information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
