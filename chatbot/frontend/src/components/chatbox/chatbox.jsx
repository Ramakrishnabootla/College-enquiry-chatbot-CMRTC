import React, { useEffect, useRef, useState } from "react";
import "./chatbox.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faMicrophone,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import ChatApi from "../../api/chatApi";
import Chat from "../chat/chat";

// Web Speech API setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechSynthesisUtterance = window.SpeechSynthesisUtterance;

export default function ChatBox(props) {
  const [chatBoxValue, setChatBoxValue] = useState("");
  const [micActive, setMicActive] = useState(false);
  const [listening, setListening] = useState(false);
  const locked = useRef(false);
  const inputRef = useRef(null);
  const divRef = useRef(null);
  const [chats, setChats] = useState([]);
  const recognitionRef = useRef(null);

  // Initialize Speech Recognition
  useEffect(() => {
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onstart = () => setListening(true);
      recognitionRef.current.onend = () => setListening(false);

      recognitionRef.current.onresult = (event) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setChatBoxValue(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setListening(false);
      };
    }
  }, []);

  // Start listening
  const startListening = () => {
    if (recognitionRef.current && !listening) {
      recognitionRef.current.start();
    }
  };

  // Stop listening
  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  // Text-to-Speech
  const speak = (text) => {
    if (SpeechSynthesisUtterance) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 1;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  function updateChats(created_by, message, related = null) {
    setChats((chats) => [
      ...chats,
      {
        created_by: created_by,
        message: message,
        related: related,
      },
    ]);

    if (micActive && created_by === "server") {
      speak(message);
    }
  }

  function onDataReceived(data) {
    setChatBoxValue("");
    if (data["status"] === 200) {
      const related = Object.values(data["related"]);
      if (related.length === 0) {
        updateChats("server", data["message"]);
      } else {
        updateChats("server", data["message"], related);
      }
    } else {
      updateChats("server", data["message"] || "An error occurred.");
    }
    locked.current = false;
  }

  useEffect(() => {
    if (chats.length === 0) {
      ChatApi.direct_request("welcomegreeting").then(onDataReceived);
    }

    // Smooth scroll to the bottom when a new message is added
    setTimeout(() => {
      if (divRef.current) {
        divRef.current.scrollTo({ top: divRef.current.scrollHeight, behavior: "smooth" });
      }
    }, 100);
  }, [chats]);

  return (
    <div
      className="chat-box-container flex flex-col"
      style={{
        height: props.isActive ? "580px" : 0,
        width: props.isActive ? "490px" : 0,
        opacity: props.isActive ? 1 : 0,
      }}
    >
      {/* Chatbox Header */}
      <div className="chat-box-top bg-orange-400 h-11 w-full text-white flex items-center px-5">
        <h6 className="font-bold mx-2 text-xs">College Enquiry Chatbot</h6>
        <span className="flex-1" />
        <button
          className="speach-btn hover:scale-125 m-5"
          style={{
            color: micActive ? "green" : "white",
          }}
          onClick={() => {
            setMicActive(!micActive);
          }}
        >
          <FontAwesomeIcon className="text-xl speach-btn-icon" icon={faMicrophone} />
        </button>
        <button
          className="hover:text-red-400 hover:scale-125"
          onClick={() => props.toggle()}
        >
          <FontAwesomeIcon className="text-xl" icon={faXmark} />
        </button>
      </div>
          
      {/* Chat Messages Container */}
      <div className="chat-box-middle flex-1 overflow-auto" ref={divRef}>
        <div>
          {chats.map((item, index) => (
            <Chat
              key={index}
              data={item}
              onAction={(klass, text) => {
                if (locked.current) return;
                locked.current = true;
                updateChats("client", text);
                ChatApi.direct_request(klass).then(onDataReceived);
              }}
            />
          ))}
        </div>
      </div>

      {/* Chatbox Input & Controls */}
      <div className="chat-box-bottom bg-orange-400 h-16 w-full flex items-center justify-center p-3">
        <input
          type="text"
          className="text-sm"
          placeholder="Type Here!"
          value={chatBoxValue}
          onChange={(e) => setChatBoxValue(e.target.value)}
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (locked.current) return;
              locked.current = true;
              updateChats("client", chatBoxValue);
              ChatApi.query_request(chatBoxValue).then(onDataReceived);
            }
          }}
        />
        <button
          className="s2t-mic-btn"
          style={{ color: listening ? "red" : "black" }}
          onClick={() => {
            if (!SpeechRecognition) {
              alert("Sorry! Your browser does not support voice inputs.");
              return;
            }
            if (listening) {
              stopListening();
              inputRef.current.focus();
            } else {
              startListening();
            }
          }}
        >
          <FontAwesomeIcon className="s2t-mic-btn-icon" icon={faMicrophone} />
        </button>
        <button
          className="hover:text-red-500"
          onClick={() => {
            if (locked.current) return;
            locked.current = true;
            updateChats("client", chatBoxValue);
            ChatApi.query_request(chatBoxValue).then(onDataReceived);
          }}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
}
