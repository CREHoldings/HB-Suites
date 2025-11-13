import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText, ScrollTrigger, ScrollToPlugin } from "gsap/all";
import { useState } from "react";

export default function PhotoGallery() {
  const photos = [
    {
      id: "01",
      title: "Salon Suite",
      image: [
        "https://ik.imagekit.io/quilkes/Health%20and%20Beauty/Suite%205a.webp",
        "https://ik.imagekit.io/quilkes/Health%20and%20Beauty/Suite%205b.webp",
      ],
      category: "Existing",
    },
    {
      id: "02",
      title: "Salon Suite",
      image: [
        "https://ik.imagekit.io/quilkes/Health%20and%20Beauty/Suite%209a.webp",
        "https://ik.imagekit.io/quilkes/Health%20and%20Beauty/Suite%209b.webp",
      ],
      category: "Existing",
    },
    {
      id: "03",
      title: ["Salon Suite", "Move-In Ready"],
      image: [
        "https://ik.imagekit.io/quilkes/Health%20and%20Beauty/New%20Wing%20Suite%207b.webp",
        "https://ik.imagekit.io/quilkes/Health%20and%20Beauty/New%20Wing%20Suite%207c.webp",
      ],
      category: "Fully Furnished",
    },
    {
      id: "04",
      title: "Salon Suite",
      image: [
        "https://ik.imagekit.io/quilkes/Health%20and%20Beauty/Suite%2023a.webp",
        "https://ik.imagekit.io/quilkes/Health%20and%20Beauty/Suite%2023b.webp",
      ],
      category: "Existing",
    },
    {
      id: "05",
      title: "Treatment Room",
      image: [
        "https://ik.imagekit.io/quilkes/Health%20and%20Beauty/Suite%2021a.webp",
        "https://ik.imagekit.io/quilkes/Health%20and%20Beauty/Suite%2021b.webp",
      ],
      category: "Existing",
    },
    {
      id: "06",
      title: "Salon Suite",
      image: [
        "https://ik.imagekit.io/quilkes/Health%20and%20Beauty/Suite%2012a.webp",
        "https://ik.imagekit.io/quilkes/Health%20and%20Beauty/Suite%2012b.webp",
      ],
      category: "Existing",
    },
    {
      id: "07",
      title: "Salon Suite",
      image: [
        "https://ik.imagekit.io/quilkes/Health%20and%20Beauty/New%20Wing%20Suite%2011a.webp",
        "https://ik.imagekit.io/quilkes/Health%20and%20Beauty/New%20Wing%20Suite%2011b.webp",
      ],
      category: "Existing",
    },
    {
      id: "08",
      title: "Salon Suite",
      image: [
        "https://ik.imagekit.io/quilkes/Health%20and%20Beauty/Suite%2019a.webp",
        "https://ik.imagekit.io/quilkes/Health%20and%20Beauty/Suite%2012b.webp",
      ],
      category: "Existing",
    },
    {
      id: "09",
      title: "Treatment Room",
      image: [
        "https://ik.imagekit.io/quilkes/Health%20and%20Beauty/Suite%2030a.webp",
        "https://ik.imagekit.io/quilkes/Health%20and%20Beauty/Suite%2030b.webp",
      ],
      category: "Existing",
    },
    {
      id: "10",
      title: "Salon Suite",
      image: [
        "https://ik.imagekit.io/quilkes/Health%20and%20Beauty/Suite%2014a.webp",
        "https://ik.imagekit.io/quilkes/Health%20and%20Beauty/Suite%2014b.webp",
      ],
      category: "Existing",
    },
  ];

  const [currentImageIndices, setCurrentImageIndices] = useState(() =>
    Array(photos.length).fill(0)
  );

  const scrollToImage = (index) => {
    const targetElement = document.getElementById(`gallery-image-${index}`);
    if (targetElement) {
      // Use direct scroll position instead of element reference
      const targetTop = targetElement.offsetTop;
      const smoother = window.gsap?.ScrollSmoother?.get();

      if (smoother) {
        smoother.scrollTo(targetTop, true);
      } else {
        window.scrollTo({ top: targetTop, behavior: "smooth" });
      }
    }
  };

  const switchImage = (photoIndex, direction) => {
    setCurrentImageIndices((prev) => {
      const newIndices = [...prev];
      if (direction === "next") {
        newIndices[photoIndex] = (newIndices[photoIndex] + 1) % 2; // Cycle between 0 and 1
      } else if (direction === "prev") {
        newIndices[photoIndex] = newIndices[photoIndex] === 0 ? 1 : 0; // Cycle between 1 and 0
      }
      return newIndices;
    });
  };

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#photo-gallery-section",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    // Create SplitText instance for the content
    const gallery_split = SplitText.create(
      ["#gallery_heading_title", "#gallery_heading_description"],
      {
        type: "lines",
        mask: "lines",
        linesClass: "line",
      }
    );

    // Set initial state for lines
    gsap.set(gallery_split.lines, {
      opacity: 0,
      y: 30,
    });

    // Animate in lines with stagger
    tl.to(gallery_split.lines, {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power2.out",
    });
  }, []);

  return (
    <div id="photo-gallery-section" className="py-16 bg-light-custom">
      {/* Header Section */}
      <div className="flex items-center justify-center mb-12">
        <div className="max-w-2xl">
          <h1
            id="gallery_heading_title"
            className="text-4xl font-light leading-tight text-center heading-custom bebas-neue-regular md:text-4xl lg:text-5xl"
          >
            Explore Our Gallery
          </h1>
          <p
            id="gallery_heading_description"
            className="px-0.5 mt-2 text-base text-center md:text-lg text-custom poppins-regular"
          >
            Discover the beauty and elegance of our premium salon suites
          </p>
        </div>
      </div>

      {/* Full-Screen Photo Gallery */}
      <div className="mx-auto space-y-2 max-w-7xl ">
        {photos.map((photo, index) => (
          <div
            id={`gallery-image-${index}`}
            key={photo.id}
            className="relative w-full h-screen overflow-hidden cursor-pointer group"
          >
            {/* First image with conditional opacity */}
            <img
              src={photo.image[0]}
              alt={`${
                Array.isArray(photo.title) ? photo.title.join(" ") : photo.title
              } - View 1`}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                currentImageIndices[index] === 0 ? "opacity-100" : "opacity-0"
              }`}
              loading={index < 2 ? "eager" : "lazy"}
              fetchPriority={index < 2 ? "high" : "low"}
              width="1920"
              height="1080"
            />
            {/* Second image with conditional opacity */}
            <img
              src={photo.image[1]}
              alt={`${
                Array.isArray(photo.title) ? photo.title.join(" ") : photo.title
              } - View 2`}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                currentImageIndices[index] === 1 ? "opacity-100" : "opacity-0"
              }`}
              loading="lazy"
              fetchPriority="low"
              width="1920"
              height="1080"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20"></div>

            {/* Watermark */}
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

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-between p-6 lg:p-12">
              {/* Top Content */}
              <div className="flex items-start justify-between">
                <div className="px-4 py-2 rounded-full bg-light-custom/10 backdrop-blur-md">
                  <span className="text-xs font-medium text-white md:text-sm">
                    {photo.id}
                  </span>
                </div>
              </div>

              {/* Bottom Content */}
              <div className="flex items-end justify-between">
                <div className="max-w-32 md:max-w-60">
                  <div className="mb-2 text-xs font-medium tracking-wider text-white uppercase md:text-sm poppins-regular">
                    {photo.category}
                  </div>
                  <h3 className="text-2xl font-light leading-tight text-white wrap-break-word md:text-3xl bebas-neue-regular lg:text-4xl">
                    {Array.isArray(photo.title)
                      ? photo.title.map((line, lineIndex) => (
                          <span
                            key={`${photo.id}-${lineIndex}`}
                            className="block"
                          >
                            {line}
                          </span>
                        ))
                      : photo.title}
                  </h3>
                </div>
              </div>
            </div>

            {/* Bottom Navigation Buttons */}
            <div className="absolute z-20 flex space-x-3 bottom-6 right-6">
              {/* {index > 0 && (
                <button
                  className="px-8 py-3 text-xs text-white transition-all border rounded-md md:text-sm border-custom bg-light-custom/10 backdrop-blur-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollToImage(index - 1);
                  }}
                >
                  Back
                </button>
              )} */}
              {index < photos.length - 1 && (
                <button
                  className="px-8 py-3 text-xs text-white transition-all border rounded-md md:text-sm border-custom bg-light-custom/10 backdrop-blur-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollToImage(index + 1);
                  }}
                >
                  Next
                </button>
              )}
            </div>

            {/* Navigation buttons positioned based on current image */}
            {currentImageIndices[index] === 0 && (
              <div className="absolute z-20 transform -translate-y-1/2 top-1/2 right-6">
                <button
                  className="p-3 text-white transition-all rounded-full bg-light-custom/10 backdrop-blur-lg hover:bg-light-custom/30"
                  onClick={(e) => {
                    e.stopPropagation();
                    switchImage(index, "next");
                  }}
                  aria-label="Next view"
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            )}
            {currentImageIndices[index] === 1 && (
              <div className="absolute z-20 transform -translate-y-1/2 top-1/2 left-6">
                <button
                  className="p-3 text-white transition-all rounded-full bg-light-custom/10 backdrop-blur-lg hover:bg-light-custom/30"
                  onClick={(e) => {
                    e.stopPropagation();
                    switchImage(index, "prev");
                  }}
                  aria-label="Previous view"
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
              </div>
            )}

            {/* Side Indicator */}
            <div className="absolute transform -translate-y-1/2 right-6 top-1/2">
              <div className="flex flex-col space-y-1">
                {photos.map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 h-8 rounded-full transition-all duration-300 ${
                      i === index ? "bg-tertiary-custom" : "bg-light-custom"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
