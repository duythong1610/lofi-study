import React, { useEffect, useRef, useState } from "react";
import HeaderComponent from "../components/HeaderComponent";
import ScreenComponent from "../components/ScreenComponent";
import GreetingComponent from "../components/GreetingComponent";
import OptionsComponent from "../components/OptionsComponent";
import ScreenListComponent from "../components/ScreenListComponent";
import MixerComponent from "../components/MixerComponent";
import YoutubeComponent from "../components/YoutubeComponent";
import ChatChannelComponent from "../components/ChatChannelComponent";
import { Modal } from "antd";
import FocusTimeComponent from "../components/FocusTimeComponent";
import {
  fetchTracks,
  playTrack,
  pauseTrack,
  nextTrack,
  prevTrack,
} from "../redux/slides/playlistSlice";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();

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

  const [messageChat, setMessageChat] = useState("");
  const [messages, setMessages] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenFocusTime, setIsModalOpenFocusTime] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [userName, setUsername] = useState("");
  const [isShowGreeting, setIsShowGreeting] = useState(false);

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

  // useEffect(() => {
  //   console.log("alo");
  //   const handleKeyDown = (event) => {
  //     if (event.code === "Space") {
  //       // Gọi hàm hoặc xử lý tại đây
  //       console.log("Space key pressed");
  //     }
  //   };

  //   // Gắn sự kiện 'keydown' vào window
  //   window.addEventListener("keydown", handleKeyDown);

  //   // Cleanup: loại bỏ sự kiện khi component bị hủy
  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []);

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
    <div>
      {" "}
      <HeaderComponent
        isShowGreeting={isShowGreeting}
        setIsShowGreeting={setIsShowGreeting}
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
        <GreetingComponent
          isShowGreeting={isShowGreeting}
          setIsShowGreeting={setIsShowGreeting}
        />
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

          {/* <Modal
            title={null}
            open={isModalOpen}
            footer={null}
            onCancel={() => setIsModalOpen(false)}
          >
            <h1 className="text-base font-medium">What's your name?</h1>
            <div className="mt-5">
              <input
                className="w-full outline-none py-1 bg-transparent border-b-2"
                placeholder="Enter your name to display in chat channel..."
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleSubmit}
              />
            </div>
          </Modal> */}
          <FocusTimeComponent
            isModalOpenFocusTime={isModalOpenFocusTime}
            setIsModalOpenFocusTime={setIsModalOpenFocusTime}
          />
          {!audioRef.current?.paused && (
            <div className="absolute bottom-[5%] left-[5%] flex items-center">
              <img
                src={tracks[selectedTrack]?.background}
                alt=""
                className={
                  audioRef.current?.paused
                    ? "md:h-8 md:w-8 lg:h-12 lg:w-12 rounded-full object-cover"
                    : "animate-spin-slow md:h-8 md:w-8 h-12 w-12 lg:h-12 lg:w-12 rounded-full object-cover"
                }
              />
              <div className="bg-white mx-3 h-[1px] w-4"></div>
              <h1 className="text-white font-semibold md:text-xs lg:text-base">
                {tracks[selectedTrack]?.playlistName}
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
