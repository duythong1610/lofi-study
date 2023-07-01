import React from "react";
import {
  PictureOutlined,
  FullscreenOutlined,
  ClockCircleOutlined,
  SlidersOutlined,
  YoutubeOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import { FloatButton, Tooltip } from "antd";
import { useTranslation } from "react-i18next";

const OptionsComponent = ({
  userName,
  setIsModalOpen,
  handleToggleYoutube,
  toggleMixer,
  toggleChat,
  toggleScreen,
  setToggleChat,
  setToggleMixer,
  setToggleScreen,
  setIsModalOpenFocusTime,
}) => {
  const { t } = useTranslation();
  const handleFullScreen = () => {
    if (document.fullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } else {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }
  };

  return (
    <div>
      {" "}
      <FloatButton.Group
        // style={{
        //   left: 84,
        // }}
        className="bg-black/60 backdrop-blur-md left-[5%] flex flex-col justify-around rounded-2xl p-2 w-fit h-fit top-1/2 -translate-x-[50%] -translate-y-[50%]"
      >
        <Tooltip placement="right" title={t("mixerTitle")}>
          <FloatButton
            icon={<SlidersOutlined />}
            className="!transition-none hover:!text-white"
            onClick={() => setToggleMixer(!toggleMixer)}
          />
        </Tooltip>
        <Tooltip placement="right" title={t("screenTitle")}>
          <FloatButton
            icon={<PictureOutlined />}
            className="!transition-none hover:!text-white"
            onClick={() => setToggleScreen(!toggleScreen)}
          />
        </Tooltip>

        <Tooltip placement="right" title={t("timerTitle")}>
          <FloatButton
            icon={<ClockCircleOutlined />}
            onClick={() => setIsModalOpenFocusTime(true)}
          />
        </Tooltip>
        <Tooltip placement="right" title={t("youtubeTitle")}>
          <FloatButton
            icon={<YoutubeOutlined />}
            onClick={() => handleToggleYoutube()}
          />
        </Tooltip>

        <Tooltip placement="right" title={t("chatChannelTitle")}>
          <FloatButton
            icon={<CommentOutlined />}
            onClick={() => {
              setToggleChat(!toggleChat);
              if (!userName) {
                setIsModalOpen(true);
              }
            }}
          />
        </Tooltip>
        <Tooltip placement="right" title={t("fullScreenTitle")}>
          <FloatButton
            icon={<FullscreenOutlined />}
            onClick={() => handleFullScreen()}
          />
        </Tooltip>
      </FloatButton.Group>
    </div>
  );
};

export default OptionsComponent;
