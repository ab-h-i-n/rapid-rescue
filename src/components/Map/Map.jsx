"use client";
import { handleLocationError } from "@/utils/handleError";
import React, { useContext, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import { HospitalContext } from "@/context/hospitalContext";
import Image from "next/image";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API;

const Map = ({ directedHospital, setDirectedHospital }) => {
  const { hospitals } = useContext(HospitalContext);

  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [userLoc, setLoc] = useState(null);
  const [distance, setDistance] = useState(null); // State to store the distance
  const [duration, setDuration] = useState(null); // State to store the duration

  const createMarker = (lngLat, iconUrl, mapInstance, text, hospital = null) => {
    const div = document.createElement("div");
    const image = document.createElement("img");
    const p = document.createElement("p");
    image.src = iconUrl;
    image.style.width = "40px";
    image.style.height = "40px";
    div.style.display = "grid";
    div.style.placeItems = "center";
    if (text) {
      p.innerText = text;
      p.style.fontWeight = 600;
    }
  
    div.append(image);
    div.append(p);
  
    const marker = new mapboxgl.Marker(div).setLngLat(lngLat).addTo(mapInstance);
  
    // Add click listener for hospital markers
    if (hospital) {
      div.addEventListener("click", () => {
        setDirectedHospital(hospital);  // Set the selected hospital
      });
    }
  
    return marker;
  };
  

  const createMarkerForHospitals = (mapInstance) => {
    if (Array.isArray(hospitals)) {
      hospitals.forEach((hosp) => {
        createMarker(
          [hosp.location.longitude, hosp.location.latitude],
          "/images/hospital.svg",
          mapInstance,
          hosp.name,
          hosp // Pass hospital object
        );
      });
    } else {
      console.error("Hospitals data is not an array", hospitals);
    }
  };
  

  const initializeMap = (userLocation) => {
    const mapInstance = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/abhin2k3/cm0pd8fuo00es01pj7h9qeyaw",
      zoom: 3,
      center: [userLocation.lng, userLocation.lat],
    });

    const directionsControl = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: "metric",
      profile: "mapbox/driving",
    });

    setMap(mapInstance);
    setDirections(directionsControl);

    mapInstance.addControl(directionsControl, "top-left");

    createMarker(
      [userLocation.lng, userLocation.lat],
      "/images/ambulance.svg",
      mapInstance
    );
  };

  const setUserLocation = (position) => {
    const { longitude, latitude } = position.coords;
    const userLocation = { lng: longitude, lat: latitude };
    setLoc(userLocation);
    initializeMap(userLocation);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        setUserLocation,
        handleLocationError
      );
    } else {
      console.error("Failed to get user location!");
    }
  }, []);

  // Watch for the hospitals data and set markers after it's loaded
  useEffect(() => {
    if (map && hospitals && Array.isArray(hospitals) && hospitals.length > 0) {
      createMarkerForHospitals(map);
    }
  }, [hospitals, map]);

  useEffect(() => {
    if (map && directions && directedHospital && userLoc) {
      directions.setOrigin([userLoc.lng, userLoc.lat]);
      directions.setDestination([
        directedHospital.location.longitude,
        directedHospital.location.latitude,
      ]);

      // Listen for the route event to get the distance and duration
      directions.on("route", (e) => {
        const route = e.route[0];
        setDistance(route.distance / 1000);
        setDuration(route.duration / 60);
      });
    }
  }, [directedHospital, map, directions, userLoc]);


  return (
    <div>
      <div
        ref={mapContainerRef}
        style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
      />
      {distance && duration && (
        <div className="animate fixed bottom-0 z-[999] flex justify-center w-screen">
          {/* details container  */}
          <div className="bg-white md:flex md:items-center md:justify-between text-black px-10 py-5 w-screen rounded-xl shadow-xl shadow-black">
            {/* name and other details  */}
            <p className="md:text-lg flex flex-col h-fit">
              <Image
                src={"/images/hospital.svg"}
                alt="hosp"
                width={50}
                height={50}
              />
              {/* name  */}
              <span className="md:text-2xl font-semibold capitalize mt-5">
                {directedHospital?.name}
              </span>
              {/* phone  */}
              <span className="md:text-lg text-black/50 font-semibold capitalize mt-2">
                {directedHospital?.phoneNumber}
              </span>
              {/* facilities  */}
              <span className="text-xs md:text-lg text-black/50 font-semibold capitalize mt-2 max-w-[80%]">
              Facilities Provided : 
                {Array.isArray(directedHospital?.facilities) ? directedHospital?.facilities.join(', ') + ", " : null}
                {Array.isArray(directedHospital?.medical_specialities) ? directedHospital?.medical_specialities.join(', ') : null}
              </span>
            </p>

            {/* distacne and time  */}
            <div className="flex items-center gap-10 py-5">
              {/* distance  */}
              <p className="flex items-center gap-2 flex-nowrap text-nowrap">
                <Image
                  src={"/images/distance.svg"}
                  alt="hosp"
                  width={40}
                  height={40}
                  className="aspect-square w-[30px] md:w-[40px]"
                />
                <span className="font-medium md:text-lg">
                  {distance.toFixed(2)} km
                </span>
              </p>
              {/* duration  */}
              <p className="flex items-center gap-3 flex-nowrap text-nowrap">
                <Image
                  src={"/images/time.svg"}
                  alt="hosp"
                  width={30}
                  height={30}
                  className="aspect-square w-[20px] md:w-[30px]"
                />
                <span className="font-medium md:text-lg">
                  {duration.toFixed(2)} minutes
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
