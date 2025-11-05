import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import PhotoGallery from "./components/PhotoGallery";
import SalonSuiteFeatures from "./components/SalonSuiteFeatures";
import StatsContainer from "./components/StatsContainer";
import gsap from "gsap";
import {
  Flip,
  SplitText,
  ScrambleTextPlugin,
  ScrollTrigger,
  ScrollSmoother,
} from "gsap/all";

gsap.registerPlugin(
  Flip,
  SplitText,
  ScrambleTextPlugin,
  ScrollTrigger,
  ScrollSmoother
);

function App() {
  return (
    <main
      id="app-wrapper"
      className="w-full min-h-screen mx-auto poppins-regular backdrop-blur-3xl"
    >
      <div id="app-content">
        <Header />
        <Hero />
        <StatsContainer />
        <AboutUs />
        <SalonSuiteFeatures />
        <PhotoGallery />
        <ContactUs />
        <Footer />
      </div>
    </main>
  );
}

export default App;
