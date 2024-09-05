export const ConvertIndexObject = (indexes, hospitals) => {
    let indexArray;
    console.log("indexes" , indexes , typeof(indexes));
    
    if(indexes === "null" || !indexes){
      console.log('returned hospital');
      
      return hospitals;
    }
  
    try {
      // Check if the input is a string and parse it if necessary
      if (typeof indexes === "string") {
        // Ensure the string is in valid JSON format
        if (
          indexes.trim().startsWith("[") &&
          indexes.trim().endsWith("]")
        ) {
          indexArray = JSON.parse(indexes);
  
          // Handle case where the parsed JSON is not an array
          if (!Array.isArray(indexArray)) {
            throw new SyntaxError("Parsed JSON is not an array");
          }
        } else {
          throw new SyntaxError("Invalid JSON format");
        }
      } else if (Array.isArray(indexes)) {
        // If indexes is already an array, use it directly
        indexArray = indexes;
      } else {
        throw new TypeError("Indexes should be a string or an array");
      }
  
      // Validate the contents of the array
      if (
        indexArray.some((index) => typeof index !== "number" || index < 0)
      ) {
        throw new TypeError("Index array contains invalid elements");
      }
  
      // Handle special case where indexArray contains [-1]
      if (indexArray.length === 1 && indexArray[0] === -1) {
        console.log("Special case: no valid indexes found, returning all hospitals");
        return hospitals;
      }
  
      // Map the indexes to the corresponding hospital objects
      const hospitalObjects = indexArray.map((index) => hospitals[index] || null);
  
      console.log("Array of hospital objects:", hospitalObjects);
      return hospitalObjects.filter(hospital => hospital !== null); // Filter out invalid entries
  
    } catch (error) {
      console.error("Error processing indexes:", error);
      return []; // Return an empty array if any error occurs
    }
  };
  