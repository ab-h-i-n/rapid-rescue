"use client";
import React, { useEffect, useState } from "react";


const Dashboard = () => {
  const [formData, setFormData] = useState({
    isBedAvailable: false,
    isIcuAvailable: false,
    medicalSpecifications: "",
    facilities: "",
  });

  useEffect(() => {
    console.log(formData)
  }, [formData])
  

  // Handle input change for radio buttons and text inputs
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "radio" ? value === "true" : value, // Convert radio button values to boolean
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // You can process the form data here
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="max-w-md mx-auto bg-slate-100 p-6 rounded-lg shadow-md space-y-6 mt-56"
    >
      <h1 className="text-2xl font-bold text-center">Hospital Update Form</h1>

      <div className="flex gap-3">
        <label className="block text-gray-700 font-medium mb-2">
          Bed Availability:
        </label>
        <label htmlFor="bedAvailability">Available</label>
        <input
          type="radio"
          name="isBedAvailable"
          id="bedAvailable"
          value={true}
          checked={formData.isBedAvailable === true}
          onChange={handleInputChange}
        />
        <label htmlFor="bedNotAvailable">Not Available</label>
        <input
          type="radio"
          name="isBedAvailable"
          id="bedNotAvailable"
          value={false}
          checked={formData.isBedAvailable === false}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex gap-3">
        <label className="block text-gray-700 font-medium mb-2">
          ICU Availability:
        </label>
        <label htmlFor="icuAvailable">Available</label>
        <input
          type="radio"
          name="isIcuAvailable"
          id="icuAvailable"
          value={true}
          checked={formData.isIcuAvailable === true}
          onChange={handleInputChange}
        />
        <label htmlFor="icuNotAvailable">Not Available</label>
        <input
          type="radio"
          name="isIcuAvailable"
          id="icuNotAvailable"
          value={false}
          checked={formData.isIcuAvailable === false}
          onChange={handleInputChange}
        />
      </div>

      <div className="medical_specifications flex flex-col gap-2">
        <label htmlFor="Medical_specification">Medical Specifications</label>
        <input
          type="text"
          name="medicalSpecifications"
          id="Medical_specification"
          placeholder="Enter specifications separated by comma"
          className="p-2 border border-black"
          value={formData.medicalSpecifications}
          onChange={handleInputChange}
        />
      </div>

      <div className="features flex flex-col gap-2">
        <label htmlFor="features">Features</label>
        <input
          type="text"
          name="facilities"
          id="features"
          placeholder="Enter features separated by comma"
          className="p-2 border border-black"
          value={formData.facilities}
          onChange={handleInputChange}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
      >
        Update
      </button>
    </form>
  );
};

export default Dashboard;
