/*
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Voice = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Sorry, your browser doesn't support voice recognition.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript.toLowerCase();
      setTranscript(spokenText);
      console.log("Heard:", spokenText);

      // Extract balance command
      if (spokenText.includes("check balance") || spokenText.includes("show balance")) {
        navigate("/balance");
        return;
      }

      // Try to extract amount and email for transfer
      const match = spokenText.match(/send (\d+)\s*(?:rupees)?\s*to\s+([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,})/);
      if (match) {
        const amount = match[1];
        const email = match[2];
        console.log("Parsed:", { amount, email });

        navigate("/121", {
          state: {
            voiceEmail: email,
            voiceAmount: amount,
          },
        });
      } else {
        alert("Unrecognized command. Try: 'Send 500 rupees to someone@example.com'");
        recognition.stop();
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, [navigate]);

  const startListening = () => {
    setTranscript("");
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white p-6 rounded-2xl shadow-md w-80 text-center">
        <h1 className="text-xl font-semibold text-blue-700 mb-4">Voice Command</h1>

        <button
          onClick={startListening}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
        >
          🎤 Tap to Speak
        </button>

        <p className="mt-4 text-gray-700">
          {isListening ? "Listening..." : "Press the button to start"}
        </p>

        {transcript && (
          <p className="mt-2 font-mono text-sm text-gray-600">Heard: {transcript}</p>
        )}
      </div>
    </div>
  );
};

export default Voice;
*/
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./loading";

const Voice = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);
  const navigate = useNavigate();
  const [loading,setloading]=useState(false);
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser doesn't support voice recognition.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
      console.log("Voice recognition started");
    };

    recognition.onresult = async (event) => {
      const spokenText = event.results[0][0].transcript.toLowerCase().trim();
      console.log("Heard:", spokenText);
      setTranscript(spokenText);

      try {
        setloading(true);
        const response = await fetch("http://127.0.0.1:5000/process-command", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: spokenText }),
        });

        const result = await response.json();
        console.log("Flask NLP Response:", result);
        
        if (result.page) {
          navigate(result.page, {
            state: {
              voiceAmount: result.amount || "",
              recipientEmail: result.email || "",
            },
          });
        } else {
          alert("Sorry, I couldn't understand that command.");
        }
      } catch (error) {
        console.error("Voice processing error:", error);
        alert("Failed to process your voice input.");
      }finally{
      setloading(false);
    }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      alert(`Error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      console.log("Voice recognition ended");
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [navigate]);

  const startListening = () => {
    if (recognitionRef.current) {
      setTranscript("");
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error("Recognition start error:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white p-6 rounded-2xl shadow-md w-80 text-center">
        <h1 className="text-xl font-semibold text-blue-700 mb-4">Voice Command</h1>
        <button
          onClick={startListening}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition duration-300"
        >
          🎤 Tap to Speak
        </button>
        <p className="text-gray-700 mt-2">
          {isListening ? "Listening..." : "Tap the mic and say a command"}
        </p>
        {transcript && (
          <p className="mt-2 font-mono text-sm text-gray-600">Heard: {transcript}</p>
        )}
      </div>
      {
        loading==true?<Loading></Loading>:null
      }
    </div>
  );
};

export default Voice;