"use client";
import { hospitals } from "@/data/Hospitals";
import addAmbulances from "@/utils/AddAmbulances";
// import { fetchHospitals } from "@/utils/FetchHospitals";
import addHospitals, { db } from "@/utils/firebaseConfig";
import React, { useEffect } from "react";

function Page() {
 
  useEffect(() => {
    addHospitals();
    console.log("hospitals added")
  }, []);

  return <div></div>;
}

export default Page;
