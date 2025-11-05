import { Plus } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const SalonSuiteFeatures = () => {
  const features = [
    {
      title: "High Quality",
      description:
        "Every suite comes furnished with high-quality storage cabinets and comfortable chairs, not to mention the beautiful laminate wood floors. Simply add your industry-specific equipment and you're ready to go!",
      image: [
        "https://ik.imagekit.io/quilkes/Health%20and%20Beauty/Hallway%207.webp",
        "https://ik.imagekit.io/quilkes/Health%20and%20Beauty/New%20Wing%20Hallway%202.webp",
      ],
      alt: [
        "Luxurious salon interior with modern furniture",
        "Elegant treatment room setting",
      ],
      hoverFeatures: [
        "Fully Furnished Salon Suites",
        "Salon Suite equipped with styling station with chair, shampoo bowl with chair, separate color bar with sink",
        "Spa Suite equipped with sink and cabinets",
        "Hot water system",
        "Air Conditioning",
        "Keys to your own Private Suite",
      ],
    },
    {
      title: "Customizable",
      description:
        "Enjoy freedom and privacy to customize your suite according to your needs and tastes. You'll never have to pay for something you don't need or be limited to the brands and items you can use or sell.",
      image: [
        "https://ik.imagekit.io/quilkes/Health%20and%20Beauty/New%20Wing%20Hallway%201.webp",
        "https://ik.imagekit.io/quilkes/Health%20and%20Beauty/New%20Wing%20Hallway%206.webp",
      ],
      alt: [
        "Customizable salon workspace with personal touches",
        "Flexible workspace design",
      ],
      hoverFeatures: [
        "Freedom and Flexibility",
        "Set your own Hours and Prices",
        "Sell your own Retail; keep 100% Profit!",
        "Two dedicated and secured Wi-Fi networks (one for you, and one for your guests)",
        "On Site Washer and Dryer",
        "Drama-Free",
      ],
    },
    {
      title: "Convenient",
      description:
        'Set your own schedule and choose when you work. Build your own clientele without the hassle of property ownership or "salon drama". No long term leases and hidden fees means you are 100% in charge of your business.',
      image: [
        "https://ik.imagekit.io/quilkes/Health%20and%20Beauty/New%20Wing%20Hallway%205.webp",
        "https://ik.imagekit.io/quilkes/Health%20and%20Beauty/New%20Wing%20Suite%207.webp",
      ],
      alt: [
        "Professional managing their schedule and business",
        "Modern business environment",
      ],
      hoverFeatures: [
        "No Long Term Leases",
        "Secured and Monitored lobby doors",
        "Advanced Security System with video surveillance",
        "All utilities included",
        "Ample Free Parking",
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
      // Create SplitText for this feature's title
      const titleSplit = SplitText.create(`#feature-title-${index}`, {
        type: "lines",
        mask: "lines",
        linesClass: "line",
      });

      // Set initial state for this feature's elements
      gsap.set(`#feature-tag-${index}`, { x: isMiddle ? 50 : -50, opacity: 0 });
      if (isMiddle) {
        gsap.set(titleSplit.lines, { opacity: 0, x: 50 });
        gsap.set(`#feature-description-${index} li`, { opacity: 0, x: 50 });
      } else {
        gsap.set(titleSplit.lines, { opacity: 0, y: 30 });
        gsap.set(`#feature-description-${index} li`, { opacity: 0, y: 30 });
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

      // Animate this feature section
      featureTl
        .to(`#feature-tag-${index}`, {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        })
        .to(
          titleSplit.lines,
          {
            opacity: 1,
            x: 0,
            y: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          `#feature-description-${index} li`,
          {
            opacity: 1,
            x: 0,
            y: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        );
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
              className={`flex flex-col lg:min-h-[400px] lg:flex-row items-stretch gap-6 md:gap-8 lg:gap-12 w-full ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Content Section */}
              <div className="flex-1 w-full px-4 py-6 space-y-4 md:px-6 lg:px-8 md:py-8 md:space-y-6 bg-light-custom">
                <div
                  id={`feature-tag-${index}`}
                  className="inline-flex items-center px-3 md:px-4 py-1.5 md:py-2 space-x-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100"
                >
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></span>
                  <span className="text-xs font-medium md:text-sm text-custom poppins-regular">
                    Feature {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h2
                  id={`feature-title-${index}`}
                  className="text-2xl font-bold leading-tight md:text-3xl lg:text-4xl heading-custom bebas-neue-regular"
                >
                  {feature.title}
                </h2>

                <ul
                  id={`feature-description-${index}`}
                  className="space-y-2 text-sm leading-relaxed md:text-base text-custom poppins-regular"
                >
                  <li className="flex items-start poppins-regular">
                    <span className="w-2 h-2 mt-1.5 mr-2 bg-[#222222] rounded-full flex-shrink-0"></span>
                    <span>{feature.description}</span>
                  </li>
                </ul>
              </div>

              {/* Image Section with Carousel (Embla) */}
              <div className="relative flex-1 w-full group">
                <div className="relative w-full h-64 overflow-hidden transition-transform duration-700 ease-out bg-black shadow-2xl sm:h-80 lg:h-96">
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
                  <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                  {/* Slide up overlay with features */}
                  <div className="absolute bottom-0 z-10 left-0 right-0 bg-linear-to-t from-black/95 via-black/80 to-transparent text-white transition-all duration-500 ease-out transform translate-y-[calc(100%-3.5rem)] md:translate-y-[calc(100%-4rem)] group-hover:translate-y-0">
                    <div className="p-4 space-y-2 md:p-6 md:space-y-3">
                      {/* Always visible title */}
                      <h3 className="text-base font-semibold uppercase md:text-lg lg:text-xl bebas-neue-regular">
                        {feature.title} Features
                      </h3>

                      {/* Features that slide up on hover */}
                      <div className="space-y-2 transition-opacity duration-300 delay-200 opacity-0 poppins-regular group-hover:opacity-100">
                        {feature.hoverFeatures.map(
                          (featureText, featureIndex) => (
                            <div
                              key={featureIndex}
                              className="flex items-start space-x-2 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                              style={{
                                transitionDelay: `${
                                  300 + featureIndex * 100
                                }ms`,
                              }}
                            >
                              <Plus className="w-3 h-3 md:w-4 md:h-4 mt-0.5 text-secondary-custom flex-shrink-0" />
                              <span className="text-xs leading-relaxed md:text-sm">
                                {featureText}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SalonSuiteFeatures;
