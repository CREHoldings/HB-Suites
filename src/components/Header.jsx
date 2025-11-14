import { useState, useEffect } from "react";
import { ChevronDown, Menu } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup function to ensure overflow is reset
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      const smoother = window.gsap?.ScrollSmoother?.get();
      if (smoother) {
        // Use ScrollSmoother's scrollTo method for smooth scrolling
        smoother.scrollTo(element, true, "top top");
      } else {
        // Fallback to regular smooth scrolling
        element.scrollIntoView({ behavior: "smooth" });
      }
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { name: "HOME", href: "#home-section" },
    { name: "SERVICES", href: "#features-section" },
    { name: "AVAILABLE SUITE", href: "#available-suite-section" },
    { name: "GALLERY", href: "#photo-gallery-section" },
    { name: "ABOUT", href: "#about-section" },
    { name: "CONTACT", href: "#contact-section" },
  ];

  return (
    <header
      className={`absolute top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-none backdrop-blur-md shadow-lg py-1.5 heading-custom"
          : "bg-none py-3 text-white"
      }`}
    >
      {/*  Header */}
      <div className="px-4 pb-1 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a
              href="#home-section"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#home-section");
              }}
              aria-label="HB Suites Home"
            >
              <img
                src="/white-logo.png"
                alt="HB Suites Logo - Luxury Furnished Office Spaces"
                className="w-auto h-20"
                loading="eager"
                width="auto"
                height="80"
              />
            </a>
          </div>

          {/* Hamburger Menu - Visible only on mobile (not on iPad/tablet) */}
          <button
            className="p-2 text-white rounded-md md:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <Menu size={24} aria-hidden="true" />
          </button>

          {/* Desktop Navigation */}
          <nav
            className="items-center hidden space-x-8 md:flex"
            aria-label="Main navigation"
          >
            {navItems.map((item, index) => (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() =>
                  setActiveDropdown(item.hasDropdown ? index : null)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className="flex items-center py-2 space-x-1 font-medium transition-colors duration-200 hover:text-secondary-custom focus:outline-none rounded"
                  onClick={() => scrollToSection(item.href)}
                  aria-label={`Navigate to ${item.name} section`}
                >
                  <span>{item.name}</span>
                  {item.hasDropdown && (
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        activeDropdown === index ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  )}
                </button>

                {/* Dropdown Menu */}
                {item.hasDropdown && (
                  <div
                    className={`absolute top-full left-0 mt-2 w-48 bg-light-custom rounded-lg shadow-xl border border-gray-100 py-2 transform transition-all duration-200 ${
                      activeDropdown === index
                        ? "opacity-100 translate-y-0 visible"
                        : "opacity-0 -translate-y-2 invisible"
                    }`}
                  >
                    {item.items.map((subItem, subIndex) => (
                      <a
                        key={subIndex}
                        href="#"
                        className="block px-4 py-2 text-sm transition-colors duration-150 text-slate-600 hover:text-secondary-custom hover:bg-blue-50"
                      >
                        {subItem}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`fixed top-0 left-0 w-full bg-light-custom z-40 transition-all duration-300 md:hidden ${
          isMenuOpen
            ? "h-screen opacity-100 visible"
            : "h-0 opacity-0 invisible overflow-hidden"
        }`}
        role="navigation"
        aria-label="Mobile navigation"
        aria-hidden={!isMenuOpen}
      >
        <div className="h-full px-4 py-4 space-y-4 overflow-y-auto">
          {/* Close button */}
          <div className="flex justify-end">
            <button
              className="p-2 rounded-md text-slate-700 focus:outline-none"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close navigation menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {navItems.map((item, index) => (
            <div key={index}>
              <button
                className="flex items-center justify-between w-full py-2 font-medium text-left text-slate-700 focus:outline-none focus:ring-2 focus:ring-secondary-custom focus:ring-offset-2 rounded"
                onClick={() => scrollToSection(item.href)}
                aria-label={`Navigate to ${item.name} section`}
              >
                <span>{item.name}</span>
                {item.hasDropdown && (
                  <ChevronDown size={16} aria-hidden="true" />
                )}
              </button>
              {item.hasDropdown && (
                <div className="mt-2 ml-4 space-y-2">
                  {item.items.map((subItem, subIndex) => (
                    <a
                      key={subIndex}
                      href="#"
                      className="block py-1 text-sm text-slate-600"
                    >
                      {subItem}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}

          <button
            className="w-full px-6 py-3 text-sm font-semibold text-white transition-colors bg-black md:text-base sm:text-base hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-secondary-custom focus:ring-offset-2 rounded"
            onClick={() => scrollToSection("#contact-section")}
            aria-label="Book a tour - Navigate to contact section"
          >
            Book a Tour
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
