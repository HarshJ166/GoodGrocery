import React from "react";

const styles = {
  aboutContainer: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
  },
  aboutTitle: {
    fontSize: "45px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  aboutDescription: {
    fontSize: "17px",
    lineHeight: 1.5,
    marginBottom: "20px",
  },
  developerName: {
    fontWeight: "bold",
  },
};

const About = () => {
  return (
    <div style={styles.aboutContainer}>
      <h1 style={styles.aboutTitle}>About Us</h1>
      <p style={styles.aboutDescription}>
        Welcome to our project! At the core of our mission is the relentless
        pursuit of excellence, pushing boundaries, and delivering innovative
        solutions. We are committed to providing top-notch software that meets
        your needs.
      </p>
      <p style={styles.aboutDescription}>
        Our dedicated team of developers, led by{" "}
        <span style={styles.developerName}>
          Harsh Jajal,Ritika Mayekar,Devyani Rawat, Siddhi Mahajan
        </span>
        , have worked tirelessly to create this project. Everyone's expertise
        and dedication have been instrumental in bringing this vision to life.
      </p>
      <p style={styles.aboutDescription}>
        We value your trust and support. Thank you for choosing our software and
        being a part of our journey towards excellence.
      </p>
    </div>
  );
};

export default About;
