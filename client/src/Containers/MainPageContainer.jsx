import React from 'react';
import { NavigationInnerBar } from '../components/MainPageComponents/NavigationInnerBar.jsx';
import { HeroSection } from '../components/MainPageComponents/HeroSectionComponent.jsx';
import { MainSectionComponent } from '../components/MainPageComponents/MainSectionComponent.jsx';
import { Box } from '@mui/material';
import { StayInformedComponent } from '../components/MainPageComponents/StayInformedComponent.jsx';

const MainPageContainer = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      className="LandingPageContainer"
      maxWidth="1300px" // Set your desired max-width value
      margin="0 auto" // Center the container horizontally
      overflow="hidden"
    >
      <NavigationInnerBar />
      <HeroSection />
      <MainSectionComponent />
      <StayInformedComponent />
    </Box>
  );
};

export default MainPageContainer;
