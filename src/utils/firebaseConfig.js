import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API,
  authDomain: NEXT_PUBLIC_FIREBASE_DOMAIN,
  databaseURL: NEXT_PUBLIC_FIREBASE_DB,
  projectId: NEXT_PUBLIC_PROJ_ID,
  storageBucket: NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: NEXT_PUBLIC_MSG_SENDER_ID,
  appId: NEXT_PUBLIC_APP_ID,
  measurementId: NEXT_PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };

// Function to add hospital data
const addHospitals = async () => {
  try {
    const hospitals = [
      {
        name: "Green Valley Hospital",
        location: {
          longitude: 76.437236,
          latitude: 10.031377,
        },
        medical_specialities: [
          "Cardiology",
          "Neurology",
          "Orthopedics",
          "Pulmonology",
          "Rheumatology",
        ],
        facilities: ["ICU", "Ventilator", "MRI", "X-ray", "CT Scan"],
        isIcuAvailable: true,
        isBedAvailable: false,
      },
      {
        name: "Sunrise Health Clinic",
        location: {
          longitude: 76.425297,
          latitude: 10.019116,
        },
        medical_specialities: [
          "Pediatrics",
          "Dermatology",
          "Radiology",
          "Allergy",
          "Internal Medicine",
        ],
        facilities: ["Ventilator", "X-ray", "Ultrasound"],
        isIcuAvailable: false,
        isBedAvailable: true,
      },
      {
        name: "CityCare Hospital",
        location: {
          longitude: 76.355672,
          latitude: 10.101724,
        },
        medical_specialities: [
          "General Surgery",
          "Oncology",
          "Urology",
          "Traumatology",
          "Endocrinology",
        ],
        facilities: [
          "ICU",
          "Ventilator",
          "MRI",
          "X-ray",
          "CT Scan",
          "Blood Bank",
        ],
        isIcuAvailable: true,
        isBedAvailable: true,
      },
      {
        name: "Lakeview Medical Center",
        location: {
          longitude: 76.307265,
          latitude: 10.083113,
        },
        medical_specialities: [
          "Gynecology",
          "Cardiology",
          "Endocrinology",
          "Gastroenterology",
          "Nephrology",
        ],
        facilities: ["ICU", "X-ray", "Ultrasound", "Dialysis"],
        isIcuAvailable: false,
        isBedAvailable: false,
      },
      {
        name: "Wellness Hospital",
        location: {
          longitude: 76.302741,
          latitude: 10.018673,
        },
        medical_specialities: [
          "Orthopedics",
          "Neurology",
          "Gastroenterology",
          "Rheumatology",
          "Hematology",
        ],
        facilities: ["ICU", "Ventilator", "MRI", "CT Scan", "Blood Bank"],
        isIcuAvailable: true,
        isBedAvailable: false,
      },
      {
        name: "Harmony Health Hub",
        location: {
          longitude: 76.30771,
          latitude: 9.999808,
        },
        medical_specialities: [
          "Ophthalmology",
          "ENT",
          "Dermatology",
          "Allergy",
          "Internal Medicine",
        ],
        facilities: ["X-ray", "Ultrasound"],
        isIcuAvailable: false,
        isBedAvailable: true,
      },
      {
        name: "Hope Medical Institute",
        location: {
          longitude: 76.283586,
          latitude: 9.987527,
        },
        medical_specialities: [
          "Pediatrics",
          "Psychiatry",
          "Nephrology",
          "Pulmonology",
          "Oncology",
        ],
        facilities: ["ICU", "Ventilator", "MRI", "X-ray", "CT Scan"],
        isIcuAvailable: true,
        isBedAvailable: true,
      },
      {
        name: "Sunshine Hospital",
        location: {
          longitude: 76.334538,
          latitude: 10.019485,
        },
        medical_specialities: [
          "Cardiology",
          "Oncology",
          "Neurology",
          "Rheumatology",
          "Gastroenterology",
        ],
        facilities: [
          "ICU",
          "Ventilator",
          "MRI",
          "X-ray",
          "Ultrasound",
          "Blood Bank",
        ],
        isIcuAvailable: false,
        isBedAvailable: true,
      },
      {
        name: "Riverbank Health Center",
        location: {
          longitude: 76.276017,
          latitude: 10.08646,
        },
        medical_specialities: [
          "General Medicine",
          "Orthopedics",
          "Endocrinology",
          "Dermatology",
          "Internal Medicine",
        ],
        facilities: ["ICU", "X-ray", "Ultrasound", "Dialysis"],
        isIcuAvailable: true,
        isBedAvailable: true,
      },
      {
        name: "Meadowlands Hospital",
        location: {
          longitude: 76.316598,
          latitude: 9.970686,
        },
        medical_specialities: [
          "Gynecology",
          "Cardiology",
          "Pulmonology",
          "Oncology",
          "Traumatology",
        ],
        facilities: ["ICU", "Ventilator", "MRI", "CT Scan", "Blood Bank"],
        isIcuAvailable: true,
        isBedAvailable: false,
      },
    ];

    // Reference to 'hospitals' in your Firebase Realtime Database
    const hospitalsRef = ref(db, "hospitals");

    // Set the hospitals data in the database
    await set(hospitalsRef, hospitals);

    console.log("Hospitals data added successfully");
  } catch (error) {
    console.error("Error adding hospitals data:", error);
  }
};

export default addHospitals;
