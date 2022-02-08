import React from "react";
import Header from "../Header/Header";
import BBCHomepage from "../HomepageNewsSummary/BBC/BBCHomepage";
import FeaturedNews from "../HomepageNewsSummary/FeaturedNews/FeaturedNews";
import TechCrunchomepage from "../HomepageNewsSummary/TechCrunch/TechCrunchomepage";
import TrumpNews from "../TrumoNews/TrumpNews";
import "./HomePage.css";



const HomePage = () => {
  return (
    <>
      <Header/>
      <FeaturedNews/>
      <TrumpNews/>
      <BBCHomepage/>
      <TechCrunchomepage/>
   
    </>
  );
};

export default HomePage;
