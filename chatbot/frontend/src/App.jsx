import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocketchat } from "@fortawesome/free-brands-svg-icons";
import "./App.css";
import ChatBox from "./components/chatbox/chatbox";
import Footer from "./components/footer/footer";


function App() {
  const [chatboxState, setChatboxState] = useState(false);

  function toggleChatWindow(newState) {
    setChatboxState(newState);
  }

  return (
    <div className="app-wrapper">
      <div className="disclaimer-banner">
        <p className="disclaimer-text">
          ℹ️ This is a project-based application deployed on shared infrastructure.
          Response times may vary based on server load and resource availability.
        </p>
      </div>
      <div className="bg-custom-image">
        <div className="content">
          <h1>CMR</h1>

          <button className="control-button">
            <FontAwesomeIcon
              icon={faRocketchat}
              onClick={() => toggleChatWindow(true)}
            />
          </button>


          <ChatBox
            isActive={chatboxState}
            toggle={() => toggleChatWindow(false)}
          />
        </div>
      </div>
      {/* <div className="tagline-section">
        <h2 className="tagline">Empowering Minds, Shaping Futures</h2>
      </div> */}
      <Footer />
    </div>

  );
}

export default App;

/*
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function App() {
  return (
    <div className="bg-custom-image">
     
      </div>
    </div>
  );
}

export default App;


*/
