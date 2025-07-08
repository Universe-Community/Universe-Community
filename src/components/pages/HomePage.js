import React from 'react';
import HeroSection from '../sections/HeroSection';
import MissionVisionSection from '../sections/MissionVisionSection';
import WhatWeDoSection from '../sections/WhatWeDoSection';
import FeaturedProjectsSection from '../sections/FeaturedProjectsSection';
import DonationSection from '../sections/DonationSection';
import CommunitySection from '../sections/CommunitySection';
import SupportSection from '../sections/SupportSection';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <MissionVisionSection />
      <WhatWeDoSection />
      <FeaturedProjectsSection />
      <DonationSection />
      <CommunitySection />
      <SupportSection />
    </>
  );
};

export default HomePage;
