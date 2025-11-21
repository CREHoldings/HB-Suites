import { Plus } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const SalonSuiteFeatures = () => {
  const features = [
    {
      title: "Elegant Common Hallway",
      description:
        "Every suite comes furnished with high-quality storage cabinets and comfortable chairs, not to mention the beautiful laminate wood floors. Simply add your industry-specific equipment and you're ready to go!",
      image: [
        "https://ik.imagekit.io/creholdings/Health%20and%20Beauty/Hallway%207.webp",
        "https://ik.imagekit.io/creholdings/Health%20and%20Beauty/New%20Wing%20Hallway%202.webp",
      ],
      alt: [
        "Luxurious salon interior with modern furniture",
        "Elegant treatment room setting",
      ],
    },
    {
      title: "Comfortable Seating Areas",
      description:
        "Enjoy freedom and privacy to customize your suite according to your needs and tastes. You'll never have to pay for something you don't need or be limited to the brands and items you can use or sell.",
      image: [
        "https://ik.imagekit.io/creholdings/Health%20and%20Beauty/New%20Wing%20Hallway%201.webp",
        "https://ik.imagekit.io/creholdings/Health%20and%20Beauty/New%20Wing%20Hallway%206.webp",
      ],
      alt: [
        "Customizable salon workspace with personal touches",
        "Flexible workspace design",
      ],
    },
    {
      title: "Highly Customizable Suites",
      description:
        'Set your own schedule and choose when you work. Build your own clientele without the hassle of property ownership or "salon drama". No long term leases and hidden fees means you are 100% in charge of your business.',
      image: [
        "https://ik.imagekit.io/creholdings/Health%20and%20Beauty/New%20Wing%20Suite%2011a.webp",
        "https://ik.imagekit.io/creholdings/Health%20and%20Beauty/New%20Wing%20Suite%207.webp",
      ],
      alt: [
        "Professional managing their schedule and business",
        "Modern business environment",
      ],
    },
  ];

  // Embla carousel refs for feature carousels
  const [emblaRef0] = useEmblaCarousel({ loop: true, duration: 30 }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);
  const [emblaRef1] = useEmblaCarousel(
    { loop: true, duration: 30, direction: "rtl" },
    [Autoplay({ delay: 4000, stopOnInteraction: false, playOnInit: true })]
  );
  const [emblaRef2] = useEmblaCarousel({ loop: true, duration: 30 }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);
  const emblaRefs = [emblaRef0, emblaRef1, emblaRef2];
  useGSAP(() => {
    // Create SplitText instance for the main heading
    const features_heading_split = SplitText.create(
      ["#features_heading_title", "#features_heading_description"],
      {
        type: "lines",
        mask: "lines",
        linesClass: "line",
      }
    );

    // Set initial state for main heading lines
    gsap.set(features_heading_split.lines, {
      opacity: 0,
      y: 30,
    });

    // Animate main heading with its own scroll trigger
    gsap.to(features_heading_split.lines, {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#features-heading-container", // Updated trigger to container
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    // Create animations for each feature section with individual scroll triggers
    features.forEach((feature, index) => {
      const isMiddle = index === 1;

      const tagSelector = `#feature-tag-${index}`;
      const titleSelector = `#feature-title-${index}`;
      const descSelector = `#feature-description-${index} li`;

      const tagEl = document.querySelector(tagSelector);
      const titleEl = document.querySelector(titleSelector);
      const descEls = document.querySelectorAll(descSelector);

      if (!tagEl && !titleEl && descEls.length === 0) {
        // If the content section is empty, skip animations for this feature
        return;
      }

      let titleSplit;
      if (titleEl) {
        titleSplit = SplitText.create(titleSelector, {
          type: "lines",
          mask: "lines",
          linesClass: "line",
        });
      }

      // Set initial state for this feature's elements, only if they exist
      if (tagEl) gsap.set(tagSelector, { x: isMiddle ? 50 : -50, opacity: 0 });
      if (titleSplit) {
        if (isMiddle) {
          gsap.set(titleSplit.lines, { opacity: 0, x: 50 });
        } else {
          gsap.set(titleSplit.lines, { opacity: 0, y: 30 });
        }
      }
      if (descEls.length) {
        if (isMiddle) {
          gsap.set(descSelector, { opacity: 0, x: 50 });
        } else {
          gsap.set(descSelector, { opacity: 0, y: 30 });
        }
      }

      // Create timeline for this feature section
      const featureTl = gsap.timeline({
        scrollTrigger: {
          trigger: `#feature-section-${index}`, // Individual trigger for this feature
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate this feature section (only existing elements)
      if (tagEl) {
        featureTl.to(tagSelector, {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        });
      }
      if (titleSplit) {
        featureTl.to(
          titleSplit.lines,
          {
            opacity: 1,
            x: 0,
            y: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.out",
          },
          tagEl ? "-=0.4" : undefined
        );
      }
      if (descEls.length) {
        featureTl.to(
          descSelector,
          {
            opacity: 1,
            x: 0,
            y: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.out",
          },
          titleSplit || tagEl ? "-=0.4" : undefined
        );
      }
    });

    // GSAP image carousel removed; Embla handles slide looping
  }, []);

  return (
    <section
      id="features-section"
      className="w-full py-12 overflow-hidden md:py-16 bg-dull-custom"
    >
      <div className="w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header Section */}
        <div
          id="features-heading-container"
          className="flex items-center justify-center mb-8 md:mb-12"
        >
          <div className="w-full max-w-2xl">
            <h1
              id="features_heading_title"
              className="text-3xl font-light leading-tight text-center heading-custom bebas-neue-regular md:text-4xl lg:text-5xl"
            >
              Suite Features
            </h1>
            <p
              id="features_heading_description"
              className="px-4 mt-2 text-sm text-center md:text-base lg:text-lg text-custom poppins-regular"
            >
              Discover what makes our salon suites the perfect choice for your
              business
            </p>
          </div>
        </div>

        <div className="space-y-12 md:space-y-16 lg:space-y-24">
          {features.map((feature, index) => (
            <div
              id={`feature-section-${index}`}
              key={index}
              className={`flex flex-col lg:min-h-[400px] lg:flex-row items-stretch gap-4 md:gap-6 lg:gap-10 w-full ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image Section with Carousel (Embla) */}
              <div className="relative w-full lg:w-3/4 group">
                <div className="relative w-full h-64 overflow-hidden transition-transform duration-700 ease-out bg-black shadow-2xl sm:h-80 lg:h-[450px]">
                  <div
                    className="w-full h-full embla"
                    ref={emblaRefs[index]}
                    dir={index === 1 ? "rtl" : undefined}
                  >
                    <div className="flex h-full embla__container">
                      {feature.image.map((imgSrc, imgIndex) => (
                        <div
                          key={imgIndex}
                          className="embla__slide flex-[0_0_100%] min-w-0 h-full"
                        >
                          <img
                            src={imgSrc}
                            alt={
                              Array.isArray(feature.alt)
                                ? feature.alt[imgIndex]
                                : feature.alt
                            }
                            className="object-cover w-full h-full"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Watermark overlay */}
                  <div className="absolute inset-0 z-10 flex items-end justify-end p-3 pointer-events-none md:p-4 lg:p-6">
                    <img
                      src="/white-logo.png"
                      alt="HB Suites watermark"
                      className="w-24 select-none opacity-20 sm:w-32 md:w-40 lg:w-56"
                    />
                  </div>
                  <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-linear-to-t from-black/20 to-transparent"></div>

                  {/* Slide up overlay with features */}
                  <div className="absolute bottom-0 z-10 left-0 right-0 text-white">
                    <div className="p-4 space-y-2 md:p-6 md:space-y-3">
                      {/* Always visible title */}
                      <h3 className="text-base font-semibold uppercase md:text-lg lg:text-xl bebas-neue-regular">
                        {feature.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="w-full lg:w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SalonSuiteFeatures;
