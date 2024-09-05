const { fetchHospitals } = require("@/utils/FetchHospitals");
const { db } = require("@/utils/firebaseConfig");
const { createContext, useState, useEffect } = require("react");

export const HospitalContext = createContext();

const HospitalContextProvider = ({ children }) => {
  const [hospitals, setHospitals] = useState();

  useEffect(() => {
    const getHospitals = async () => {
      const hosps = await fetchHospitals(db);
      console.log(hosps);
      setHospitals(hosps);
    };

    getHospitals();
  }, []);

  return <HospitalContext.Provider value={{hospitals , setHospitals}} >{children}</HospitalContext.Provider>;
};

export default HospitalContextProvider
