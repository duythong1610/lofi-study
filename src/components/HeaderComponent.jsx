import {
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
import { Menu, Modal, Popover } from "antd";
import { resetUser } from "../redux/slides/userSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getItem } from "../utils/util";
import AccountOverviewComponent from "./AccountOverviewComponent";

const HeaderComponent = ({
  audioRef,
  setCurrentTime,
  duration,
  currentTime,
}) => {
  const { t } = useTranslation();
  const isPlaying = useSelector((state) => state.playlist.isPlaying);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [openKeys, setOpenKeys] = useState(["user"]);
  const [keySelected, setKeySelected] = useState("accountOverview");

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
            // onClick={() => {
            //   navigate("/thong-tin-tai-khoan");
            // }}
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

  const renderPage = (key) => {
    switch (key) {
      case "accountOverview":
        return <AccountOverviewComponent setKeySelected={setKeySelected} />;
      case "editProfile":
        return <div>kkk2</div>;
      case "language":
        return <div>kkk 3</div>;
      default:
        return;
    }
  };
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const handleOnClick = ({ key }) => {
    setKeySelected(key);
  };

  const items = [
    getItem(
      t("accountOverview"),
      "accountOverview",
      <HomeOutlined className="!text-base" />
    ),
    getItem(
      t("editProfile"),
      "editProfile",
      <EditOutlined className="!text-base" />
    ),
    getItem(
      t("changePassword"),
      "changePassword",
      <LockFilled className="!text-base" />
    ),
    getItem(t("language"), "language", <UserOutlined />),
  ];
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
          <Popover
            trigger={["click"]}
            content={content}
            placement="bottomLeft"
            style={{ padding: "0px" }}
            className="hidden md:block "
          >
            <div
              className="!flex p-3 bg-black/60 backdrop-blur-sm  rounded-full cursor-pointer "
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

          <Modal
            bodyStyle={{ minHeight: "70vh" }}
            width={"50vw"}
            title={null}
            open={false}
            footer={null}
            // onCancel={() => setIsModalOpenFocusTime(false)}
          >
            <div
              style={{
                display: "flex",
              }}
            >
              <Menu
                selectedKeys={keySelected}
                // defaultOpenKeys={"accountOverview"}
                defaultSelectedKeys={keySelected}
                // openKeys={openKeys}
                onClick={handleOnClick}
                style={{
                  width: 256,
                  background: "transparent",
                  color: "#FFF",
                }}
                onOpenChange={onOpenChange}
                mode="inline"
                items={items}
              />

              <div style={{ flex: 1, padding: "15px" }}>
                {renderPage(keySelected)}
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
