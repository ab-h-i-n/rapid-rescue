import { ref, set } from "firebase/database";
import { db } from "./firebaseConfig"; // Adjust the import path as needed

// Function to add ambulance data
const addAmbulances = async () => {
  try {
    const ambulances = [
      {
        id: "ambulance1",
        driver_name: "Rajesh Kumar",
        license_plate: "KL-01-1234",
        coordinates: {
          longitude: 76.437236,
          latitude: 10.031377,
        },
      },
      {
        id: "ambulance2",
        driver_name: "Sita Patel",
        license_plate: "KL-02-5678",
        coordinates: {
          longitude: 76.448000,
          latitude: 10.045000,
        },
      },
      {
        id: "ambulance3",
        driver_name: "Ravi Sharma",
        license_plate: "KL-03-9101",
        coordinates: {
          longitude: 76.355000,
          latitude: 10.110000,
        },
      },
      {
        id: "ambulance4",
        driver_name: "Neeta Verma",
        license_plate: "KL-04-1122",
        coordinates: {
          longitude: 76.290000,
          latitude: 10.085000,
        },
      },
      {
        id: "ambulance5",
        driver_name: "Anil Singh",
        license_plate: "KL-05-3344",
        coordinates: {
          longitude: 76.320000,
          latitude: 10.025000,
        },
      },
      {
        id: "ambulance6",
        driver_name: "Pooja Rani",
        license_plate: "KL-06-5566",
        coordinates: {
          longitude: 76.340000,
          latitude: 10.010000,
        },
      },
      {
        id: "ambulance7",
        driver_name: "Vikram Joshi",
        license_plate: "KL-07-7788",
        coordinates: {
          longitude: 76.270000,
          latitude: 9.980000,
        },
      },
      {
        id: "ambulance8",
        driver_name: "Aarti Mehta",
        license_plate: "KL-08-9900",
        coordinates: {
          longitude: 76.355000,
          latitude: 10.030000,
        },
      },
      {
        id: "ambulance9",
        driver_name: "Manoj Kumar",
        license_plate: "KL-09-2233",
        coordinates: {
          longitude: 76.290000,
          latitude: 10.090000,
        },
      },
      {
        id: "ambulance10",
        driver_name: "Sunita Devi",
        license_plate: "KL-10-4455",
        coordinates: {
          longitude: 76.310000,
          latitude: 9.960000,
        },
      },
    ];

    // Reference to 'ambulances' in your Firebase Realtime Database
    const ambulancesRef = ref(db, 'ambulances');

    // Set the ambulances data in the database
    await set(ambulancesRef, ambulances);

    console.log('Ambulances data added successfully');
  } catch (error) {
    console.error('Error adding ambulances data:', error);
  }
};

export default addAmbulances;
