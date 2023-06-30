import { useEffect, useRef, useState } from "react";
import "./index.css";
import Draggable from "react-draggable";

import { Modal } from "antd";
import ScreenComponent from "./components/ScreenComponent";
import ScreenListComponent from "./components/ScreenListComponent";
import MixerComponent from "./components/MixerComponent";
import YoutubeComponent from "./components/YoutubeComponent";
import ChatChannelComponent from "./components/ChatChannelComponent";
import OptionsComponent from "./components/OptionsComponent";
import GreetingComponent from "./components/GreetingComponent";
import FocusTimeComponent from "./components/FocusTimeComponent";
import HeaderComponent from "./components/HeaderComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  playTrack,
  pauseTrack,
  nextTrack,
  prevTrack,
  fetchTracks,
} from "./redux/slides/playlistSlice";

function App() {
  const [bgItem, setBgItem] = useState("");
  const [playListItem, setPlaylistItem] = useState("");
  const [bgSelected, setBgSelected] = useState(localStorage.getItem("bg"));
  const [playlistSelected, setPlayListSelected] = useState(
    localStorage.getItem("playlist")
  );

  const tracks = useSelector((state) => state.playlist.tracks);
  const selectedTrack = useSelector(
    (state) => state.playlist.currentTrackIndex
  );
  const isPlaying = useSelector((state) => state.playlist.isPlaying);
  const dispatch = useDispatch();

  const [messageChat, setMessageChat] = useState("");
  const [messages, setMessages] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenFocusTime, setIsModalOpenFocusTime] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [userName, setUsername] = useState("");

  const [toggleScreen, setToggleScreen] = useState(false);
  const [toggleMixer, setToggleMixer] = useState(false);
  const [toggleYoutube, setToggleYoutube] = useState(false);
  const [toggleChat, setToggleChat] = useState(false);
  const [hiddenYoutube, setHiddenYoutube] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);

  const handleFetchTracks = () => {
    dispatch(fetchTracks());
  };

  useEffect(() => {
    handleFetchTracks();
  }, []);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement?.paused || isPlaying) {
      audioElement?.play();
    } else if (audioElement?.played || isPlaying) {
      audioElement?.pause();
    }
  }, [isPlaying, selectedTrack]);

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
      <HeaderComponent
        audioRef={audioRef}
        setCurrentTime={setCurrentTime}
        duration={duration}
        currentTime={currentTime}
      />
      <div className="relative h-screen max-h-screen overflow-hidden w-screen bg-black">
        <audio
          className="hidden"
          src={tracks[selectedTrack]?.url}
          controls
          ref={audioRef}
          onLoadedMetadata={(e) => {
            setDuration(e.target.duration);
          }}
          onTimeUpdate={(e) => {
            setCurrentTime(e.target.currentTime);
          }}
        />
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
            toggleMixer={toggleMixer}
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
            playlistSelected={playlistSelected}
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
          />
        </div>
      </div>
    </>
  );
}

export default App;
