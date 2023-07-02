import {
  CaretDownOutlined,
  CaretRightOutlined,
  EditOutlined,
  FastBackwardOutlined,
  FastForwardOutlined,
  HomeOutlined,
  LockFilled,
  LogoutOutlined,
  PauseOutlined,
  SettingOutlined,
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
import * as UserService from "../services/UserService";
import { Popover } from "antd";
import { resetUser } from "../redux/slides/userSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import UserSettingsComponent from "./UserSettingsComponent";
import LanguageComponent from "./LanguageComponent";
import CurrentTime from "./CurrentTime";
import logo from "../../public/logochill.gif";

const HeaderComponent = ({
  audioRef,
  setCurrentTime,
  duration,
  currentTime,
}) => {
  const tracks = useSelector((state) => state.playlist.tracks);
  const selectedTrack = useSelector(
    (state) => state.playlist.currentTrackIndex
  );

  console.log(tracks[selectedTrack]);
  const { t } = useTranslation();
  const isPlaying = useSelector((state) => state.playlist.isPlaying);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserSettingsOpen, setIsUserSettingsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  console.log(isPlaying);

  const handleMusic = () => {
    if (isPlaying) {
      dispatch(pauseTrack());
    } else {
      dispatch(playTrack());
    }
  };

  console.log(user);
  const handleNext = () => {
    dispatch(nextTrack());
  };

  const handleLogout = async () => {
    // setLoading(true);
    await UserService.logoutUser();
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    // message.success("Đăng xuất thành công!");
    dispatch(resetUser());
    navigate("/");
    // setLoading(false);
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

  const content = (
    <>
      {user.id && (
        <div className="hidden md:block w-full overflow-hidden text-white">
          <div className="py-2 px-3 flex items-center gap-3 mb-3">
            <div>
              <img
                src="https://tiki.vn/blog/wp-content/uploads/2023/03/gojou-luc-nhan.webp"
                alt=""
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div className="flex items-center">
              <h1>
                {t("helloTitle") + ", "}
                <span className="cursor-pointer hover:text-pink-600  font-bold">
                  {user.firstName} {user.lastName}
                </span>
              </h1>
            </div>
          </div>
          <div
            onClick={() => {
              setIsUserSettingsOpen(true);
            }}
            className="py-2 px-3 cursor-pointer hover:bg-pink-700 w-full flex gap-2 items-center"
          >
            <SettingOutlined />
            <h1>{t("userSettings")}</h1>
          </div>

          <div
            onClick={handleLogout}
            className="py-2 px-3  cursor-pointer hover:bg-pink-700 w-full flex gap-2 items-center"
          >
            <LogoutOutlined />
            <h1>{t("logoutTitle")}</h1>
          </div>
        </div>
      )}
    </>
  );
  const content1 = (
    <>
      <div className="hidden md:block w-full overflow-hidden text-white">
        <div className="py-2 px-3 flex items-center gap-3 mb-3">
          <LanguageComponent />
        </div>
      </div>
    </>
  );

  const content2 = (
    <>
      <div className="hidden md:block overflow-hidden text-white py-1 px-2 w-[300px]">
        <div className="range flex items-center text-white text-sm ">
          <span className="min-w-[35px]">{formatTime(currentTime)}</span>
          <input
            className="slider-timer mx-2"
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={(e) => {
              audioRef.current.currentTime = parseFloat(e.target.value);
              setCurrentTime(e.target.value);
            }}
          />
          <span className="w-fit">{formatTime(duration)}</span>
        </div>
      </div>
    </>
  );

  console.log("re-render");
  return (
    <div>
      <LoginComponent
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <div className="fixed top-0 left-0 right-0 flex h-32 z-[5] px-[3vw] bg-transparent w-full ">
        <div className="relative h-full w-full mt-5">
          <div className="absolute left-0 -top-5">
            <img src={logo} alt="" className="w-28 h-28" />
          </div>
          <div className="absolute right-0 flex items-center gap-3">
            <div className="bg-black/60 backdrop-blur-sm  px-4 py-1 rounded-xl">
              <CurrentTime />
            </div>
            <div className="bg-black/60 backdrop-blur-sm  px-4 py-1 rounded-xl">
              <div className="flex items-center gap-3 text-2xl justify-center">
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
                <Popover
                  trigger={["click"]}
                  content={content2}
                  placement="bottomRight"
                  style={{ padding: "0px" }}
                  className="hidden md:block "
                >
                  <CaretDownOutlined className="text-white cursor-pointer text-base" />
                </Popover>
              </div>
            </div>

            <Popover
              trigger={["click"]}
              content={content1}
              placement="bottomLeft"
              style={{ padding: "0px" }}
              className="hidden md:block "
            >
              <div
                className="!flex p-2 bg-black/60 backdrop-blur-sm  rounded-full cursor-pointer "
                // onClick={() => handleLogin()}
              >
                <SettingOutlined className="text-white" />
                {/* <h1 className="text-white text-base">
                {user.id ? `${t("helloTitle")}, ` : `${t("loginTitle")}`}
                <span className="hover:text-pink-600  font-bold">
                  {user.firstName}
                </span>
              </h1> */}
              </div>
            </Popover>

            <Popover
              trigger={["hover", "click"]}
              content={content}
              placement="bottomRight"
              style={{ padding: "0px" }}
              className="hidden md:block "
            >
              <div
                className="!flex p-2 bg-black/60 backdrop-blur-sm  rounded-full cursor-pointer "
                onClick={() => handleLogin()}
              >
                <UserOutlined className="text-white" />
                {/* <h1 className="text-white text-base">
                {user.id ? `${t("helloTitle")}, ` : `${t("loginTitle")}`}
                <span className="hover:text-pink-600  font-bold">
                  {user.firstName}
                </span>
              </h1> */}
              </div>
            </Popover>

            {isUserSettingsOpen && (
              <UserSettingsComponent
                isUserSettingsOpen={isUserSettingsOpen}
                setIsUserSettingsOpen={setIsUserSettingsOpen}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
