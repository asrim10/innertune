import React from "react";
import { LandingNavbar } from "./LandingNavbar"; // Import LandingNavbar component
import LandingHero from "./LandingHero";
import LandingFeatures from "./LandingFeatures";
import LandingWorkFLow from "./LandingWorkFLow";

const LandingPage = () => {
  return (
    <div>
      <LandingNavbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <LandingHero />
        <LandingFeatures />
        <LandingWorkFLow />
      </div>
    </div>
  );
};

export default LandingPage;
