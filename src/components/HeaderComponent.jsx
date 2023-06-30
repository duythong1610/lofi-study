import {
  CaretRightOutlined,
  FastBackwardOutlined,
  FastForwardOutlined,
  PauseOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  nextTrack,
  pauseTrack,
  playTrack,
  prevTrack,
} from "../redux/slides/playlistSlice";
import LoginComponent from "./LoginComponent";

const HeaderComponent = ({
  audioRef,
  setCurrentTime,
  duration,
  currentTime,
}) => {
  const isPlaying = useSelector((state) => state.playlist.isPlaying);

  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  console.log(isPlaying);

  const handleMusic = () => {
    if (isPlaying) {
      dispatch(pauseTrack());
    } else {
      dispatch(playTrack());
    }
  };

  const handleNext = () => {
    dispatch(nextTrack());
  };

  const handlePrev = () => {
    dispatch(prevTrack());
  };

  const handleLogin = () => {
    setIsModalOpen(true);
    setIsLogin(true);
  };

  // const handleTimeUpdate = (event) => {
  //   const audioElement = event.target;
  //   setCurrentTime(audioElement.currentTime);
  //   setDuration(audioElement.duration);
  // };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");

    if (hours > 0) {
      return `${hours}:${minutes}:${seconds}`;
    } else {
      return `${minutes}:${seconds}`;
    }
  };
  return (
    <div>
      <LoginComponent
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <div className="fixed flex top-0 left-0 z-[5] bg-transparent w-full py-3 px-[5%] h-32">
        <div className="absolute top-[40px] w-[400px] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-black/60 backdrop-blur-sm  px-4 py-1 rounded-xl">
          <div className="flex items-center gap-5 text-2xl justify-center">
            <FastBackwardOutlined
              className="text-white cursor-pointer"
              onClick={() => handlePrev()}
            />
            {isPlaying ? (
              <PauseOutlined
                className="text-white cursor-pointer w-[20px]"
                onClick={() => handleMusic()}
              />
            ) : (
              <CaretRightOutlined
                className="text-white cursor-pointer w-[20px]"
                onClick={() => handleMusic()}
              />
            )}

            <FastForwardOutlined
              className="text-white cursor-pointer"
              onClick={() => handleNext()}
            />
          </div>
          <div className="range flex items-center gap-2 text-white text-sm">
            <span>{formatTime(currentTime)}</span>
            <input
              className="slider-timer"
              type="range"
              min={0}
              max={duration}
              value={currentTime}
              onChange={(e) => {
                audioRef.current.currentTime = parseFloat(e.target.value);
                setCurrentTime(e.target.value);
              }}
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>
        <div className="absolute right-[5%] flex items-center gap-3">
          <div
            className="flex items-center gap-2 bg-black/60 backdrop-blur-sm w-fit px-4 py-1 rounded-xl cursor-pointer "
            onClick={() => handleLogin()}
          >
            <UserOutlined className="text-white text-base mb-[2px]" />
            <h1 className="text-white text-base">Login</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
