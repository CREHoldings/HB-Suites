import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect } from "react";

const AboutUs = () => {
  const aboutImages = [
    {
      id: 1,
      src: "https://ik.imagekit.io/quilkes/Health%20and%20Beauty/Hallway%202.webp",
      alt: "Modern salon suite interior",
    },
    {
      id: 2,
      src: "https://ik.imagekit.io/quilkes/Health%20and%20Beauty/Hallway%208.webp",
      alt: "Luxury beauty treatment room",
    },
    {
      id: 3,
      src: "https://ik.imagekit.io/quilkes/Health%20and%20Beauty/Hallway%204.webp",
      alt: "Professional workspace environment",
    },
    {
      id: 4,
      src: "https://ik.imagekit.io/quilkes/Health%20and%20Beauty/Hallway%205.webp",
      alt: "Elegant reception area",
    },
    {
      id: 5,
      src: "https://ik.imagekit.io/quilkes/Health%20and%20Beauty/Hallway%203.webp",
      alt: "Premium beauty chair setup",
    },
  ];

  // Initialize Embla Carousel with autoplay
  const [emblaRef] = useEmblaCarousel({ loop: true, duration: 30 }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#about-section",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    // Create SplitText instance for all text elements including the heading
    const about_split = SplitText.create(
      ["#about_heading", "#about_p1", "#about_p2"],
      { type: "lines", mask: "lines", linesClass: "line" }
    );

    // Set initial state for all lines
    gsap.set(about_split.lines, { opacity: 0, y: 30 });

    // Animate in all lines with stagger
    tl.to(about_split.lines, {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out",
    });
  }, []);

  return (
    <section id="about-section" className="min-h-screen pb-20 bg-light-custom">
      <div className="py-20 mx-auto md:px-8 max-w-7xl lg:px-16">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 h-fit lg:h-[450px] gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left - Image Carousel */}
          <div className="flex items-center h-full px-2">
            <div className="relative w-full h-full overflow-hidden bg-black shadow-2xl">
              <div className="h-full embla" ref={emblaRef}>
                <div className="flex h-full embla__container">
                  {aboutImages.map((image) => (
                    <div
                      key={image.id}
                      className="embla__slide flex-[0_0_100%] min-w-0 h-full"
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="object-cover w-full h-full select-none"
                        draggable={false}
                        onContextMenu={(e) => e.preventDefault()}
                        loading={image.id === 1 ? "eager" : "lazy"}
                        fetchPriority={image.id === 1 ? "high" : "low"}
                        width="1920"
                        height="1080"
                      />
                    </div>
                  ))}
                </div>
              </div>
              {/* Transparent interaction-blocking overlay to discourage downloads */}
              <div
                className="absolute inset-0 z-20"
                style={{ backgroundColor: "transparent" }}
                onContextMenu={(e) => e.preventDefault()}
                onMouseDown={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
              />
              {/* Watermark overlay */}
              <div className="absolute inset-0 z-10 flex items-end justify-end p-4 pointer-events-none md:p-6">
                <img
                  src="/white-logo.png"
                  alt="HB Suites watermark"
                  className="w-32 select-none opacity-20 md:w-48 lg:w-56"
                  style={{ filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.35))" }}
                  loading="lazy"
                  width="224"
                  height="auto"
                  fetchPriority="low"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="flex flex-col justify-center p-4 lg:p-0 text-custom ">
            <h1
              id="about_heading"
              className="text-4xl font-light leading-tight heading-custom bebas-neue-regular md:text-4xl lg:text-5xl"
            >
              About HB Suites
            </h1>

            <p
              id="about_p1"
              className="mb-4 text-base text-wrap md:text-lg poppins-regular"
            >
              Modern, all-inclusive beauty and wellness spaces built to elevate
              professionals and entrepreneurs.
            </p>

            <p
              id="about_p2"
              className="mb-10 text-base md:text-lg poppins-regular"
            >
              Furnished Salon and Wellness Suites
              <br />
              Ideal for:
              <br />
              <span className="ml-4 block">• Hairstylists</span>
              <span className="ml-4 block">• Estheticians</span>
              <span className="ml-4 block">• Massage Therapists and more</span>
              Wi-Fi and Utilities Included
              <br />
              On-Site Laundry Facilities
              <br />
              Comfortable Break & Seating Areas
              <br />
              Flexible Month-to-Month Leases
              <br />
              Easily Customizable Suites
              <br />
              Ample Free Parking
            </p>

            <div>
              <button
                onClick={() => {
                  const contactSection =
                    document.getElementById("contact-section");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="px-6 py-3 font-semibold text-white bg-black hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-secondary-custom focus:ring-offset-2 rounded"
                aria-label="Navigate to contact section to schedule a tour"
              >
                Schedule a Tour
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
