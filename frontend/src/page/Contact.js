import React from "react";

const Contact = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 border border-gray-300 rounded-lg shadow-md custom-font">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">
        Contact Information
      </h1>
      <p className="text-lg md:text-xl mb-4">
        <strong>Name:</strong> Harsh Jajal
      </p>
      <p className="text-lg md:text-xl mb-4">
        <strong>Email:</strong>{" "}
        <a href="mailto:harshjajal786@gmail.com" className="text-blue-500">
          harshjajal786@gmail.com
        </a>
      </p>
      <p className="text-lg md:text-xl mb-4">
        <strong>Phone No:</strong> +91 9892152003
      </p>
      <p className="text-lg md:text-xl mb-4">
        <strong>LinkedIn:</strong>{" "}
        <a
          href="https://www.linkedin.com/in/harsh-jajal-263170247/"
          className="text-blue-500"
        >
          Harsh Jajal's LinkedIn
        </a>
      </p>
    </div>
  );
};

export default Contact;
