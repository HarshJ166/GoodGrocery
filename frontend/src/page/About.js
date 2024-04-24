import React from "react";

const About = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 md:px-0 py-8 custom-font">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">About Us</h1>
      <p className="text-base md:text-lg mb-4 leading-relaxed">
        Welcome to our project! At the core of our mission is the relentless
        pursuit of excellence, pushing boundaries, and delivering innovative
        solutions. We are committed to providing top-notch software that meets
        your needs.
      </p>
      <p className="text-base md:text-lg mb-4 leading-relaxed">
        Our dedicated team of developers, led by{" "}
        <span className="font-bold text-xl">
          Harsh Jajal, Ritika Mayekar, Devyani Rawat, Siddhi Mahajan
        </span>
        , have worked tirelessly to create this project. Everyone's expertise
        and dedication have been instrumental in bringing this vision to life.
      </p>
      <p className="text-base md:text-lg mb-4 leading-relaxed">
        We value your trust and support. Thank you for choosing our software and
        being a part of our journey towards excellence.
      </p>
    </div>
  );
};

export default About;
