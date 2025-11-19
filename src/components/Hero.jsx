import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { slides } from "./Slide";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(null);
  const bgRef1 = useRef(null);
  const bgRef2 = useRef(null);
  const activeBg = useRef(1); // alternate backgrounds for crossfade

  // Auto-play slideshow with smoother pacing
  useEffect(() => {
    const interval = setInterval(() => {
      setPrevSlide(currentSlide);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      activeBg.current = activeBg.current === 1 ? 2 : 1;
    }, 6000); // 6 seconds total (including fade time)
    return () => clearInterval(interval);
  }, [currentSlide]);

  // Update background position for second slide on mobile
  useEffect(() => {
    const activeBgRef =
      activeBg.current === 1 ? bgRef1.current : bgRef2.current;
    if (activeBgRef && currentSlide === 1) {
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        activeBgRef.style.backgroundPosition = "left center";
        activeBgRef.style.backgroundSize = "125% 100%";
      } else {
        activeBgRef.style.backgroundPosition = "center center";
        activeBgRef.style.backgroundSize = "cover";
      }
    }
  }, [currentSlide]);

  // Animate text transitions with SplitText
  useGSAP(() => {
    const tl = gsap.timeline();

    const hero_split = SplitText.create(["#hero_main_heading"], {
      type: "lines",
      mask: "lines",
      linesClass: "line",
    });

    // Fade out existing lines
    tl.to(hero_split.lines, {
      opacity: 0,
      y: -30,
      stagger: 0.1,
      duration: 0.5,
      ease: "power2.out",
    });

    // Background crossfade + zoom animation
    tl.call(() => {
      const nextBgRef =
        activeBg.current === 1 ? bgRef1.current : bgRef2.current;
      nextBgRef.style.backgroundImage = `url(${slides[currentSlide].bg})`;

      // Shift second slide to left on mobile to show more left content
      if (currentSlide === 1) {
        if (window.innerWidth < 768) {
          nextBgRef.style.backgroundPosition = "left center";
          nextBgRef.style.backgroundSize = "125% 100%";
        } else {
          nextBgRef.style.backgroundPosition = "center center";
          nextBgRef.style.backgroundSize = "cover";
        }
      } else {
        nextBgRef.style.backgroundPosition =
          window.innerWidth < 768 ? "top center" : "center center";
        nextBgRef.style.backgroundSize = "cover";
      }

      gsap.set(nextBgRef, { opacity: 0, scale: 1.05, zIndex: 2 });
      gsap.to(nextBgRef, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power2.inOut",
        onComplete: () => {
          // hide previous background
          const prevBgRef =
            activeBg.current === 1 ? bgRef2.current : bgRef1.current;
          gsap.set(prevBgRef, { opacity: 0, zIndex: 1 });
        },
      });

      // Update text content
      document.getElementById("hero_main_heading").textContent =
        slides[currentSlide].title;

      hero_split.revert();

      // Recreate split for new text
      const new_split = SplitText.create(["#hero_main_heading"], {
        type: "lines",
        mask: "lines",
        linesClass: "line",
      });

      // Fade in new lines (after background settles)
      gsap.fromTo(
        new_split.lines,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.3,
        }
      );
    });
  }, [currentSlide]);

  const goToSlide = (index) => {
    setPrevSlide(currentSlide);
    setCurrentSlide(index);
    activeBg.current = activeBg.current === 1 ? 2 : 1;
  };

  return (
    <section
      id="home-section"
      className="relative w-full h-[80vh] md:h-screen overflow-hidden bg-black"
    >
      {/* Dual background layers for crossfade */}
      <div
        ref={bgRef1}
        className="absolute inset-0 transition-all duration-1000 ease-in-out bg-top md:bg-center bg-cover"
        style={{
          backgroundImage: `url(${slides[0].bg})`,
          opacity: 1,
          zIndex: 2,
        }}
        role="img"
        aria-label={slides[0].title}
      />
      <div
        ref={bgRef2}
        className="absolute inset-0 transition-all duration-1000 ease-in-out bg-top md:bg-center bg-cover opacity-0"
        style={{ zIndex: 1 }}
        role="img"
        aria-hidden="true"
      />

      {/* Overlays */}
      <div className="absolute inset-0 z-10 w-full h-full bg-linear-to-r from-black/70 via-black/50 to-black/30"></div>
      <div className="absolute inset-0 z-10 w-full h-full bg-linear-to-t from-black/60 via-transparent to-transparent"></div>

      {/* Watermark */}
      <div className="absolute inset-0 z-20 flex items-end justify-end p-4 pointer-events-none md:p-6">
        <img
          src="/white-logo.png"
          alt="HB Suites watermark"
          className="w-32 select-none opacity-20 md:w-48 lg:w-56"
          style={{ filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.35))" }}
          loading="lazy"
          width="224"
          height="auto"
          fetchPriority="low"
        />
      </div>

      {/* Main content */}
      <div className="relative z-30 flex items-center h-full px-8 mx-auto max-w-7xl lg:px-12">
        <div id="hero-content" className="text-white">
          <div className="pt-10">
            <h1
              id="hero_main_heading"
              className="text-5xl font-bold leading-tight lg:text-7xl bebas-neue-regular"
            >
              {slides[currentSlide].title}
            </h1>
          </div>

          {/* CTA Button */}
          <div className="mt-8">
            <button
              onClick={() => {
                const contactSection =
                  document.getElementById("contact-section");
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="flex items-center justify-center px-6 py-3 space-x-2 font-semibold text-white bg-black shadow-lg hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 rounded"
              aria-label="Navigate to contact section to schedule a tour"
            >
              <span>Schedule a Tour</span>
            </button>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute z-40 flex items-center space-x-2 -translate-x-1/2 bottom-8 left-1/2">
        <div className="flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="relative group focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 rounded"
              aria-label={`Go to slide ${index + 1}: ${slides[index].title}`}
              aria-current={index === currentSlide ? "true" : "false"}
            >
              <div
                className={`w-12 h-1 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-[#679ece]"
                    : "bg-light-custom/30 hover:bg-light-custom/50"
                }`}
              >
                {index === currentSlide && (
                  <div className="absolute inset-0 rounded-full bg-[#679ece] animate-pulse"></div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
