import React, { useState, useEffect, useRef } from "react";
import "./chat.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faUser } from "@fortawesome/free-solid-svg-icons";

export default function Chat(props) {
  const { data, onAction } = props;
  const [loading, setLoading] = useState(true);
  const chatContainerRef = useRef(null); // Parent container ref

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust timing as needed

    return () => clearTimeout(timer);
  }, [data]); // Re-run effect when `data` changes

  // Auto-scroll when new message arrives
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [data]);

  return (
    <div ref={chatContainerRef} className="chat-container">
      {loading && data["created_by"] === "server" ? (
        <div className="w-full flex items-end p-2">
          <FontAwesomeIcon className="mb-4" icon={faRobot} />
          <div className="loading-dots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
          <span className="flex-1"></span>
        </div>
      ) : (
        <>
          {data["created_by"] === "server" ? (
            <div className="w-full flex items-end p-2">
              <FontAwesomeIcon className="mb-4" icon={faRobot} />
              <div>
                <div className="chat-message-server bg-yellow-100 flex items-center justify-end m-1 p-2 w-72 flex-col">
                  <p className="whitespace-normal w-64">{data.message}</p>
                </div>
                <div className="m-1 p-2 w-72">
                  {data["related"] !== null &&
                    Object.values(data["related"]).map((value, index) => (
                      <button
                        key={index}
                        className="direct-btn"
                        onClick={() => {
                          onAction(value["tag"], value["text"]);
                        }}
                      >
                        {value["text"]}
                      </button>
                    ))}
                </div>
              </div>
              <span className="flex-1"></span>
            </div>
          ) : data["created_by"] === "client" ? (
            <div className="w-full flex items-end p-2">
              <span className="flex-1"></span>
              <div className="chat-message-client bg-yellow-200 flex items-center justify-end m-1 p-2 w-72">
                <p className="whitespace-normal w-64">{data.message}</p>
              </div>
              <FontAwesomeIcon className="mb-2" icon={faUser} />
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
