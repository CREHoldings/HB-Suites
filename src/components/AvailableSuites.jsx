import { CheckCircle, XCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { suitePositions } from "../data/suiteOccupancy";

const statusConfig = {
  available: {
    label: "Available",
    className: "text-red-600",
    Icon: CheckCircle,
  },
  leased: {
    label: "Leased",
    className: "heading-custom",
    Icon: XCircle,
  },
};

const AvailableSuites = () => {
  const [suiteData, setSuiteData] = useState([]);

  useEffect(() => {
    // Fetch suite status from JSON file
    fetch("/suite-status.json")
      .then((response) => response.json())
      .then((data) => {
        // Merge status data with position data
        const mergedData = suitePositions.map((positionData) => {
          const statusData = data.suites.find((s) => s.id === positionData.id);
          return {
            ...positionData,
            status: statusData?.status || "leased", // Default to 'leased' if not found
          };
        });
        setSuiteData(mergedData);
      })
      .catch((error) => {
        console.error("Error loading suite status:", error);
        // Fallback: use positions with default status
        setSuiteData(suitePositions.map((p) => ({ ...p, status: "leased" })));
      });
  }, []);

  const suitesOnPlan = suiteData.filter(
    (suite) => suite.position && statusConfig[suite.status]
  );

  return (
    <section
      id="available-suite-section"
      className="py-20 bg-white poppins-regular"
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-light leading-tight text-center heading-custom bebas-neue-regular md:text-4xl lg:text-5xl">
            Available Suites
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our range of fully furnished office suites. Download the
            complete floorplan to see detailed layouts.
          </p>
        </div>

        {/* Floorplan Display */}
        <div className="mb-12">
          {/* Floorplan Image */}
          <div
            className="relative bg-white w-full"
            style={{ aspectRatio: "16/9" }}
          >
            <img
              src="https://ik.imagekit.io/creholdings/Health%20and%20Beauty/Floorplan%20%20(1).webp"
              alt="HB Suites Floor Plan"
              className="absolute inset-0 w-full h-full object-contain"
              loading="lazy"
            />
            <div className="absolute inset-0 pointer-events-none select-none">
              {suitesOnPlan.map((suite) => {
                const config = statusConfig[suite.status];
                return (
                  <div
                    key={suite.id}
                    style={{
                      top: suite.position.top,
                      left: suite.position.left,
                    }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-md px-2.5 py-1.5 flex items-center gap-1.5 text-[6px] sm:text-[8px]  lg:text-xs font-semibold tracking-wide ${config.className}`}
                    data-suite-id={suite.id}
                  >
                    <span>{config.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">
              Ready to schedule a tour of our available suites?
            </p>
            <button
              onClick={() => {
                const element = document.querySelector("#contact-section");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="px-6 py-3 text-sm font-semibold text-white transition-colors bg-black md:text-base sm:text-base hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-secondary-custom focus:ring-offset-2 rounded"
              aria-label="Book a tour - Navigate to contact section"
            >
              Schedule a Tour
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AvailableSuites;
