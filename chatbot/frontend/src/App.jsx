import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocketchat } from "@fortawesome/free-brands-svg-icons";
import "./App.css";
import ChatBox from "./components/chatbox/chatbox";


function App() {
  const [chatboxState, setChatboxState] = useState(false);

  function toggleChatWindow(newState) {
    setChatboxState(newState);
  }

  return (
    <div className="bg-custom-image">
    <div className="content">
      <h1>CMR</h1>
      <p className="quete">Empowering Minds, Shaping Futures</p>
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
