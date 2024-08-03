import React from "react";
import { Box, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import Hero from "../Components/Hero";
import FAQ from "../Components/FAQ";
import Features from "../Components/Features";
import Highlights from "../Components/Highlights";
import Pricing from "../Components/Pricing";

const Home = () => {
  return (
    <>
      <Hero />
      <Box sx={{ bgcolor: "background.default" }}>
        <Divider />
        <Features />
        <Divider />
        <Highlights />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider />
      </Box>
    </>
  );
};

export default Home;
