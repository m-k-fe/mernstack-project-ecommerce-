import React from "react";
import Acceuil from "../components/Acceuil";
import Cars from "../components/Cars";
import Contact from "../components/Contact";
import Services from "../components/Services";

function Home() {
  return (
    <>
      <Acceuil />
      <Cars />
      <Services />
      <Contact />
    </>
  );
}

export default Home;
