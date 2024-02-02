import React from "react";

const styles = {
  contactContainer: {
    maxWidth: "600px",
    margin: "auto",
    padding: "40px",
    border: "3px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  contactTitle: {
    fontSize: "40px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  contactDetails: {
    fontSize: "16px",
    marginBottom: "10px",
  },
  linkedinLink: {
    fontSize: "16px",
    color: "blue",
  },
};

const Contact = () => {
  return (
    <div style={styles.contactContainer}>
      <h1 style={styles.contactTitle}>Contact Information</h1>
      <p style={styles.contactDetails}>
        <strong>Name:</strong> Harsh Jajal
      </p>
      <p style={styles.contactDetails}>
        <strong>Email:</strong>{" "}
        <a href="mailto:harshjajal786@gmail.com">harshjajal786@gmail.com</a>
      </p>
      <p style={styles.contactDetails}>
        <strong>Phone No:</strong> +91 9892152003
      </p>
      <p style={styles.contactDetails}>
        <strong>LinkedIn:</strong>{" "}
        <a
          href="https://www.linkedin.com/in/harsh-jajal-263170247/"
          style={styles.linkedinLink}
        >
          Harsh Jajal's LinkedIn
        </a>
      </p>
    </div>
  );
};

export default Contact;
