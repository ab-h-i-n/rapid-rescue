"use client";
import { HospitalContext } from "@/context/hospitalContext";
import getAmbulanceLocation from "@/utils/AmbulanceLocation";
import { ConvertIndexObject } from "@/utils/ConvertIndexObject";
import { NearestHospital } from "@/utils/NearestHospital";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";

function InputElement({
  symptoms,
  setSymptoms,
  setDirectedHospital,
  setHandleSearch,
}) {
  const [loading, setLoading] = useState(false);
  const { hospitals } = useContext(HospitalContext);

  const handleSymptomsChange = (event) => {
    setSymptoms(event.target.value);
  };

  async function handleSearch(symptoms) {
    setLoading(true);

    const genAI = new GoogleGenerativeAI(
      "AIzaSyDG9CGRLqrJl-zTW8fBf8Jif3F7Fw9NDm8"
    );

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Return only the indexes of the hospitals from ${JSON.stringify(
      hospitals
    )} which have facilities , medical specialties  suitable for treating the symptoms: "${symptoms}". If such hospitals are found, return an array of their indexes. If no suitable hospitals are found, return null. Do not include any additional information. Return in text format, no code block.`;

    try {
      let indexes = await model.generateContent(prompt);
      indexes = indexes.response.text();
      console.log("content:", indexes);

      const ambulance_location = await getAmbulanceLocation();
      console.log("ambulance location:", ambulance_location);

      let filtered_hospitals = ConvertIndexObject(indexes, hospitals);
      console.log("filtered hospitals:", filtered_hospitals);

      if (filtered_hospitals.length === 0) {
        filtered_hospitals = hospitals;
      }

      let nearestHospital = NearestHospital(
        filtered_hospitals,
        ambulance_location
      );
      console.log("nearest hospital:", nearestHospital);
      setDirectedHospital(nearestHospital);
    } catch (error) {
      console.error("Error during search:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch(symptoms);
    }
  };

  useEffect(() => {
    setHandleSearch(()=>handleSearch);
  }, []);

  return (
    <div className="w-[80%]">
      <label htmlFor="symptoms" className="relative">
        <input
          type="text"
          name="symptoms"
          id="symptoms"
          value={symptoms}
          placeholder="Enter symptoms, disease or health condition here"
          className="w-full h-full border border-black p-4 rounded-full"
          onChange={handleSymptomsChange}
          onKeyDown={handleKeyDown}
        />
        <div
          className="bg-blue-600 absolute top-1/2 -translate-y-1/2 right-1 p-3 rounded-full cursor-pointer"
          onClick={()=>handleSearch(symptoms)}
        >
          <Image
            src={loading ? "/images/loading.svg" : "/images/search.svg"}
            width={20}
            height={20}
            className={`${loading ? "animate-spin" : ""}`}
            alt="Search"
          />
        </div>
      </label>
    </div>
  );
}

export default InputElement;
