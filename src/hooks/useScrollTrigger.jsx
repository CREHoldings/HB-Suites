import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const useScrollTrigger = (animationCallback, dependencies = []) => {
  const elementRef = useRef(null);

  useGSAP(
    () => {
      const element = elementRef.current;
      if (!element) return;

      // Create ScrollTrigger animation
      animationCallback(element);
    },
    { dependencies, scope: elementRef }
  );

  return elementRef;
};
