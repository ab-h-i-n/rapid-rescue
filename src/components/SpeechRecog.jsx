"use client";
import React, { useState, useEffect, useRef } from "react";

const SpeechRecog = ({ text, setText, handleSearch }) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const silenceTimerRef = useRef(null);
  const [lang , setLang] = useState("en-US");

  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      recognitionRef.current = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();
      const recognition = recognitionRef.current;

      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = lang;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => {
        setIsListening(false);
        // if (handleSearch && text) {
        //   handleSearch(text);  // Trigger the search function when speech recognition ends
        // }
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");
        setText(transcript);

        clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = setTimeout(() => {
          recognition.stop();
        }, 1000);
      };

      return () => {
        if (recognition) {
          recognition.stop();
          clearTimeout(silenceTimerRef.current);
        }
      };
    } else {
      alert("Speech Recognition API is not supported in this browser.");
    }
  }, [setText, handleSearch , lang]);

  const handleListen = () => {
    const recognition = recognitionRef.current;
    if (recognition) {
      if (isListening) {
        recognition.stop();
        clearTimeout(silenceTimerRef.current);
      } else {
        recognition.start();
      }
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={handleListen}
        className={`w-12 p-2 rounded-full ${
          isListening ? "bg-red-600" : "bg-blue-600"
        }`}
      >
        <img src="/voice.svg" alt="Start/Stop Listening" />
      </button>

      <button className="w-[50px] aspect-square grid place-items-center bg-blue-600 cursor-pointer text-white font-medium rounded-full" onClick={()=>setLang((prev)=>(prev === 'en-US' ? 'ml-IN' : 'en-US' ))}>
        { lang === "en-US" ? "EN" : "ML" }
      </button>
    </div>
  );
};

export default SpeechRecog;
