"use client";
import React, { useEffect, useState } from "react";
import InputElement from "../InputElement";
import SpeechRecog from "../SpeechRecog";

const Header = ({ directedHospital, setDirectedHospital }) => {
  const [text, setText] = useState("");
  const [handleSearch, setHandleSearch] = useState(null);

  useEffect(() => {
    console.log(text);
  }, [text]);

  return (
    <header className="p-4 fixed top-0 z-10 w-full flex justify-center items-center gap-2">
      <InputElement
        symptoms={text}
        setSymptoms={setText}
        setDirectedHospital={setDirectedHospital}
        setHandleSearch={setHandleSearch} // Pass down setHandleSearch
      />
      <SpeechRecog
        text={text}
        setText={setText}
        handleSearch={handleSearch} // Pass down handleSearch
      />
    </header>
  );
};

export default Header;
