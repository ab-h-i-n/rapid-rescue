"use client";
import Header from "@/components/Header/Header";
import Map from "@/components/Map/Map";
import HospitalContextProvider from "@/context/hospitalContext";
import { useState } from "react";

export default function Home() {
  const [directedHospital, setDirectedHospital] = useState();

  return (
    <>
      <HospitalContextProvider>
        <Header
          directedHospital={directedHospital}
          setDirectedHospital={setDirectedHospital}
        />
        <Map
          directedHospital={directedHospital}
          setDirectedHospital={setDirectedHospital}
        />
      </HospitalContextProvider>
    </>
  );
}
