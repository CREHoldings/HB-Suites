import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function StatsContainer() {
  const stats = [
    {
      value: "40+",
      title: "Premium Beauty and Wellness Suites",
      description:
        "Modern workspaces with cutting-edge technology and flexible terms",
      targetValue: 40,
      suffix: "+",
    },
    {
      value: "500+",
      title: "Satisfied Clients",
      description: "Businesses thriving in our professional environments",
      hasDecoration: true,
      targetValue: 500,
      suffix: "+",
    },
    // Will be enable later
    // {
    //   value: "2",
    //   title: "Prime Locations",
    //   description: "Strategic business addresses across major cities",
    //   targetValue: 2,
    //   suffix: "",
    // },
  ];

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#stats-container",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    stats.forEach((stat, index) => {
      const statId = `stat-${index + 1}`;
      const targetValue = stat.targetValue;
      const suffix = stat.suffix;

      tl.to(
        `#${statId}`,
        {
          innerHTML: targetValue,
          duration: 2,
          ease: "power2.out",
          snap: { innerHTML: 1 },
          onUpdate: function () {
            const value = Math.ceil(this.targets()[0].innerHTML);
            const displayValue = value >= targetValue ? targetValue : value;
            document.getElementById(statId).innerHTML = displayValue + suffix;
          },
        },
        index * 0.2 // stagger the animations
      );
    });
  }, []);

  return (
    <div
      id="stats-container"
      className="flex items-center justify-center p-4 poppins-regular bg-dull-custom sm:p-6 lg:p-8"
    >
      <div className="flex flex-col w-full gap-4 max-w-7xl sm:flex-row sm:gap-5">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`relative flex-1 p-6 text-center bg-light-custom sm:p-8 ${
              stat.hasDecoration ? "relative" : ""
            }`}
          >
            <div
              id={`stat-${index + 1}`}
              className="mb-2 text-3xl font-bold heading-custom bebas-neue-regular sm:text-4xl lg:text-5xl"
            >
              0{stat.suffix}
            </div>
            <div className="mb-1 text-base md:text-lg font-semibold text-custom sm:text-base">
              {stat.title}
            </div>
            <div className="text-sm md:text-base leading-relaxed text-custom sm:text-sm">
              {stat.description}
            </div>

            {stat.hasDecoration && (
              <div className="absolute flex items-center justify-center top-4 right-4 sm:top-6 sm:right-6 sm:w-8 sm:h-8">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping sm:w-3 sm:h-3"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
