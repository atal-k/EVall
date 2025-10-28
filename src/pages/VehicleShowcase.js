// ============================================
// 📁 src/pages/VehicleShowcase.js
// ============================================

import React from 'react';
import TechnicalDetails from '../components/sections/TechnicalDetails';
import Callout from '../components/sections/Callout';
import FeatureSection from '../components/sections/FeatureSection';
import FeaturesCarousel from '../components/sections/FeaturesCarousel';
import ShowcaseBanner from '../components/sections/ShowcaseBanner';

const VehicleShowcase = () => {
  const exteriorFeaturesData = {
    title: "The Spectrum Of Exterior Refined",
    subtitle: "Tune-in to the dynamic exterior successfully integrating aerodynamic efficiency with bold geometric styling, creating a commanding presence while ensuring durability on Indian roads.",
    image: "/images/exterior-features/main.png",
    imageAlt: "Electric Vehicle Exterior",
    features: [
      {
        id: 1,
        title: "Signature LED Lights",
        description: "The LED Daytime Running Lights (DRL) and the high-precision headlamps not only give a bold and modern look but also provide the best visibility and safety in all weather conditions.",
        image: "/images/exterior-features/led-light.png",
        position: { top: "51.5%", right: "27.5%" }
      },
      {
        id: 2,
        title: "High-Performance Disc Brake System",
        description: "Engineered for precision and reliability, this advanced disc brake system delivers superior stopping power and heat dissipation.",
        image: "/images/exterior-features/disc-brake.png",
        position: { top: "78.4%", right: "41.3%" }
      },
      {
        id: 3,
        title: "Spacious Cargo Carrier",
        description: "The rear carrier is well-designed to handle a great deal of weight—up to 1495 kg, thereby allowing for bigger and smarter daily deliveries.",
        image: "/images/exterior-features/cargo-carrier.png",
        position: { top: "48.1%", left: "23.1%" }
      },
      {
        id: 4,
        title: "Striking Front Design",
        description: "The futuristic grille and the aerodynamic front fascia create a striking and modern look while ensuring maximum airflow, road presence, and style, and accentuating the confidence of next-generation mobility.",
        image: "/images/exterior-features/front-design.png",
        position: { top: "56.5%", right: "14.9%" }
      }
    ]
  };
  const interiorFeaturesData = {
    title: "Commanding From Infotainment to Aesthetics",
    subtitle: "Designed to deliver a perfect blend of comfort, functionality, and advanced technology. Inside, you’ll find a spacious cabin with premium-quality fabric seats, ergonomically crafted for long hours of driving.",
    image: "/images/interior-features/main.png",
    imageAlt: "Electric Vehicle Interior",
    features: [
      {
        id: 1,
        title: "High-Resolution Driving Interface",
        description: "Real-time statistical visualization delivers precise metrics on velocity, battery voltage, system health, and range, empowering operators with actionable data.",
        image: "/images/interior-features/speedometer.jpg",
        position: { top: "37.6%", right: "39.4%" }
      },
      {
        id: 2,
        title: "Multifunction Steering Wheel",
        description: "Control audio, calls, and connectivity without taking your hands off the wheel.",
        image: "/images/interior-features/steering.jpg",
        position: { top: "48.3%", right: "22.2%" }
      },
      {
        id: 3,
        title: "Climate Precision Control",
        description: "Experience smart weather control system that adapts instantly, allowing you to fine-tune your ideal cabin climate.",
        image: "/images/interior-features/dashboard.jpg",
        position: { top: "65.7%", left: "33.1%" }
      }
    ]
  };
    return (
        <>
          <div className="app">
            <main>
              <TechnicalDetails/>
              <FeatureSection data={exteriorFeaturesData} />
              <FeatureSection data={interiorFeaturesData} />
              <FeaturesCarousel/>
              <ShowcaseBanner/>
              <Callout/>
            </main>
          </div>
        </>
      );
};

export default VehicleShowcase;

