import { ref, get } from "firebase/database";

export const fetchHospitals = async (db) => {
  try {
    const hospitalsRef = ref(db, "hospitals");
    const snapshot = await get(hospitalsRef);

    if (snapshot.exists()) {
      const hospitals = snapshot.val();
      console.log("Hospitals data fetched successfully:", hospitals);
      return hospitals;
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error("Error fetching hospitals data:", error);
    return null;
  }
};
