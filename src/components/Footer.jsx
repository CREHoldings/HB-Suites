const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      const smoother = window.gsap?.ScrollSmoother?.get();
      if (smoother) {
        const y = smoother.offset(element, "top top");
        smoother.scrollTo(y, true);
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="text-white pb-5 bg-[#242424] poppins-regular">
      <div className="px-4 pt-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col pb-5 items-center  justify-between lg:flex-row">
          {/* Logo and Copyright */}
          <div className="mb-8 w-full lg:w-fit lg:mb-0 text-left">
            <div className="flex items-center justify-cente mb-4 lg:justify-start">
              <a
                href="#home-section"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("#home-section");
                }}
                aria-label="HB Suites Home"
              >
                <img
                  src="white-logo.png"
                  alt="HB Suites Logo"
                  className="object-cover w-auto h-16 sm:h-20"
                  loading="lazy"
                  width="auto"
                  height="80"
                />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="w-full lg:w-auto">
            <h4 className="mb-4 text-base md:text-lg font-semibold text-white">
              Quick Link
            </h4>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 md:flex lg:flex-row lg:gap-6">
              <a
                href="#home-section"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("#home-section");
                }}
                className="text-left lg:text-center text-xs md:text-sm text-gray-300 transition-colors duration-200 hover:text-white"
              >
                Home
              </a>
              <a
                href="#photo-gallery-section"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("#photo-gallery-section");
                }}
                className="text-left lg:text-center text-xs md:text-sm text-gray-300 transition-colors duration-200 hover:text-white"
              >
                Photo Gallery
              </a>
              <a
                href="#about-section"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("#about-section");
                }}
                className="text-left lg:text-center text-xs md:text-sm text-gray-300 transition-colors duration-200 hover:text-white"
              >
                About HB Suites
              </a>
              <a
                href="#contact-section"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("#contact-section");
                }}
                className="text-left lg:text-center text-xs md:text-sm text-gray-300 transition-colors duration-200 hover:text-white"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
        <div className="text-xs md:text-sm pt-5 border-t border-[#555555] text-gray-400">
          © {currentYear} HB Suites. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
export default Footer;
