import { useEffect, useRef, useState } from "react";
import "./index.css";
import Draggable from "react-draggable";

import { Modal } from "antd";
import "react-lazy-load-image-component/src/effects/blur.css";
import ScreenComponent from "./components/ScreenComponent";
import ScreenListComponent from "./components/ScreenListComponent";
import MixerComponent from "./components/MixerComponent";
import YoutubeComponent from "./components/YoutubeComponent";
import ChatChannelComponent from "./components/ChatChannelComponent";
import OptionsComponent from "./components/OptionsComponent";
import GreetingComponent from "./components/GreetingComponent";
import TimeLeftComponent from "./components/TimeLeftComponent";
import FocusTimeComponent from "./components/FocusTimeComponent";

function App() {
  const [bgItem, setBgItem] = useState("");
  const [bgSelected, setBgSelected] = useState(localStorage.getItem("bg"));

  const [messageChat, setMessageChat] = useState("");
  const [messages, setMessages] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenFocusTime, setIsModalOpenFocusTime] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [userName, setUsername] = useState("");

  const [listTask, setListTask] = useState([]);

  const [countdown, setCountdown] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [isCounting, setIsCounting] = useState(false);

  const [toggleScreen, setToggleScreen] = useState(false);
  const [toggleMixer, setToggleMixer] = useState(false);
  const [toggleYoutube, setToggleYoutube] = useState(false);
  const [toggleChat, setToggleChat] = useState(false);
  const [hiddenYoutube, setHiddenYoutube] = useState(false);

  const handleStopCountdown = () => {
    clearInterval(intervalId);
    setIsCounting(false);
  };

  useEffect(() => {
    if (isCounting) {
      const id = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      setIntervalId(id);
    } else {
      clearInterval(intervalId);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [isCounting]);

  useEffect(() => {
    if (countdown === 0) {
      handleStopCountdown();
    }
  }, [countdown]);

  const handleSubmit = (e) => {
    if (e.keyCode === 13) {
      if (userName) {
        setIsUser(true);
        setIsModalOpen(false);
      } else {
        setIsUser(false);
      }
    }
  };

  const currentVolume = localStorage.getItem("volume");

  const handleChangeScreen = (item) => {
    setBgItem(item);
    localStorage.setItem("bg", item.video);
    setBgSelected(localStorage.getItem("bg"));
  };

  const handleToggleYoutube = () => {
    if (!toggleYoutube) {
      setToggleYoutube(!toggleYoutube);
    } else {
      setHiddenYoutube(!hiddenYoutube);
    }
  };

  return (
    <>
      <div className="relative h-screen max-h-screen overflow-hidden w-screen bg-black">
        <TimeLeftComponent countdown={countdown} listTask={listTask} />
        <ScreenComponent bgItem={bgItem} bgSelected={bgSelected} />

        <GreetingComponent />
        <div>
          <OptionsComponent
            userName={userName}
            handleToggleYoutube={handleToggleYoutube}
            toggleScreen={toggleScreen}
            setToggleScreen={setToggleScreen}
            toggleChat={toggleChat}
            setToggleChat={setToggleChat}
            setToggleMixer={setToggleMixer}
            setToggleYoutube={setToggleYoutube}
            setIsModalOpen={setIsModalOpen}
            setIsModalOpenFocusTime={setIsModalOpenFocusTime}
          />
          <ScreenListComponent
            handleChangeScreen={handleChangeScreen}
            bgSelected={bgSelected}
            toggleScreen={toggleScreen}
            setToggleScreen={setToggleScreen}
          />
          <MixerComponent
            toggleMixer={toggleMixer}
            setToggleMixer={setToggleMixer}
          />
          <YoutubeComponent
            toggleYoutube={toggleYoutube}
            setToggleYoutube={setToggleYoutube}
            setHiddenYoutube={setHiddenYoutube}
            hiddenYoutube={hiddenYoutube}
          />
          <ChatChannelComponent
            userName={userName}
            messageChat={messageChat}
            messages={messages}
            setMessages={setMessages}
            setMessageChat={setMessageChat}
            isUser={isUser}
            toggleChat={toggleChat}
            setToggleChat={setToggleChat}
          />

          <Modal
            title="What's your name?"
            open={isModalOpen}
            footer={null}
            onCancel={() => setIsModalOpen(false)}
          >
            <div className="mt-5">
              <input
                className="w-full outline-none py-1 bg-transparent border-b-2"
                placeholder="Enter your name to display in chat channel..."
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleSubmit}
              />
            </div>
          </Modal>
          <FocusTimeComponent
            isModalOpenFocusTime={isModalOpenFocusTime}
            setIsModalOpenFocusTime={setIsModalOpenFocusTime}
            setListTask={setListTask}
          />
        </div>
      </div>
    </>
  );
}

export default App;
