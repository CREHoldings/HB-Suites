import { useState, useEffect } from "react";
import { CheckCircle, XCircle } from "lucide-react";

const AvailableSuites = () => {
  const [suites, setSuites] = useState([]);

  useEffect(() => {
    // Load suite data from JSON file
    fetch('/suites.json')
      .then(response => response.json())
      .then(data => {
        // Validate and normalize the data
        if (!Array.isArray(data)) {
          console.error('Error: suites.json does not contain an array');
          setSuites([]);
          return;
        }
        
        // Filter and validate each suite object
        const validatedSuites = data
          .filter(suite => {
            if (typeof suite !== 'object' || suite === null) {
              console.warn('Invalid suite object found:', suite);
              return false;
            }
            if (typeof suite.id === 'undefined') {
              console.warn('Suite object missing id:', suite);
              return false;
            }
            if (typeof suite.status === 'undefined') {
              console.warn('Suite object missing status:', suite);
              return false;
            }
            // Handle special case: if status is "8", treat as "leased"
            if (suite.status === "8") {
              suite.status = "leased";
            } 
            // If status is not "available" or "leased", default to "available"
            else if (!['available', 'leased'].includes(suite.status)) {
              console.warn(`Invalid status value "${suite.status}" for suite "${suite.id}", defaulting to "available"`);
              suite.status = "available";
            }
            return true;
          })
          .map(suite => ({
            id: String(suite.id), // Ensure id is a string
            status: String(suite.status) // Ensure status is a string
          }));
        
        setSuites(validatedSuites);
      })
      .catch(error => {
        console.error('Error loading suite data:', error);
        // Fallback to empty array if there's an error
        setSuites([]);
      });
  }, []);

  return (
    <section
      id="available-suite-section"
      className="py-20 bg-white poppins-regular"
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-light leading-tight text-center heading-custom bebas-neue-regular md:text-4xl lg:text-5xl" >
            Available Suites
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our range of fully furnished office suites. Download the complete floorplan to see detailed layouts.
          </p>
        </div>

        {/* Floorplan Display */}
        <div className="mb-12"> 
          {/* Floorplan Image */}
          <div className="bg-white border-2 border-custom flex items-center justify-center mb-6 max-h-[500px]">
            <img 
              src="https://ik.imagekit.io/quilkes/Health%20and%20Beauty/HB%20Suites%20Floorplan.webp" 
              alt="HB Suites Floor Plan" 
              className="w-full h-auto object-contain max-h-[500px]"
              loading="lazy"
            />
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-6 justify-center">
            <div className="flex items-center gap-2">
              <CheckCircle className="heading-custom" size={20} />
              <span className="text-gray-700 font-medium">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="text-red-500" size={20} />
              <span className="text-gray-700 font-medium">Leased</span>
            </div>
          </div>
        </div>

        {/* Suites List */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {suites.map((suite) => {
            // Double check that suite has required properties before rendering
            if (!suite || typeof suite.id === 'undefined' || typeof suite.status === 'undefined') {
              return null; // Skip rendering invalid suite objects
            }
            
            return (
              <div
                key={suite.id}
                className={`p-4 border transition-all cursor-pointer ${
                  suite.status === "available"
                    ? "border-black"
                    : "bg-red-50 border-red-200 hover:border-red-300"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-base font-semibold heading-custom">
                    {suite.id}
                  </h4>
                  {suite.status === "available" ? (
                    <CheckCircle className="heading-custom" size={18} />
                  ) : (
                    <XCircle className="text-red-500" size={18} />
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      suite.status === "available"
                        ? "bg-green-100 heading-custom"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {suite.status === "available" ? "Available" : "Leased"}
                  </span>
                </div>
              </div>
            );
          })}
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
    </section>
  );
}

export default AvailableSuites;
