import { ref, update } from "firebase/database";
import { db } from "./firebaseConfig";

export const updateHospDetails = async (formData, hospitalIndex) => {
  try {
    const hospitalsRef = ref(db, "hospitals");
    const snapshot = await get(hospitalsRef);

    if (snapshot.exists()) {
      const hospitals = snapshot.val();

      if (hospitals && hospitals[hospitalIndex]) {
        const hospitalId = Object.keys(hospitals)[hospitalIndex];

        const medicalSpecialitiesArray = formData.medical_specialities.split(',');
        const facilitiesArray = formData.facilities.split(',');

        const hospitalRef = ref(db, 'hospitals/' + hospitalId);

        const updatedData = {
          isBedAvailable: formData.isBedAvailable === 'true',
          isIcuAvailable: formData.isIcuAvailable === 'true',
          medical_specialities: medicalSpecialitiesArray.map(spec => spec.trim()),
          facilities: facilitiesArray.map(facility => facility.trim()),
        };

        await update(hospitalRef, updatedData);
        console.log("Hospital details updated successfully");
      } else {
        console.log("Invalid hospital index");
      }
    } else {
      console.log("No hospitals data available to update");
    }
  } catch (error) {
    console.error("Error updating hospital details:", error);
  }
};
