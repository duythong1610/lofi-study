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
import { useSelector } from "react-redux";

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
  const isShowOptions = useSelector((state) => state.settings.isShowOptions);

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
      {isShowOptions && (
        <FloatButton.Group className="bg-black/60 backdrop-blur-md left-[5%] flex flex-col justify-around rounded-2xl p-1 lg:p-2 w-fit h-fit top-1/2 -translate-x-[50%] -translate-y-[50%] mb-0">
          <Tooltip placement="right" title={t("mixerTitle")}>
            <FloatButton
              icon={<SlidersOutlined className="lg:text-lg md:text-base" />}
              className="!transition-none hover:!text-white !mb-1 lg:!mb-4"
              onClick={() => setToggleMixer(!toggleMixer)}
            />
          </Tooltip>
          <Tooltip placement="right" title={t("screenTitle")}>
            <FloatButton
              icon={<PictureOutlined className="lg:text-lg md:text-base" />}
              className="!transition-none hover:!text-white !mb-1 lg:!mb-4"
              onClick={() => setToggleScreen(!toggleScreen)}
            />
          </Tooltip>

          <Tooltip placement="right" title={t("timerTitle")}>
            <FloatButton
              className="!mb-1 lg:!mb-4"
              icon={<ClockCircleOutlined className="lg:text-lg md:text-base" />}
              onClick={() => setIsModalOpenFocusTime(true)}
            />
          </Tooltip>
          <Tooltip placement="right" title={t("youtubeTitle")}>
            <FloatButton
              className="!mb-1 lg:!mb-4"
              icon={<YoutubeOutlined className="lg:text-lg md:text-base" />}
              onClick={() => handleToggleYoutube()}
            />
          </Tooltip>

          <Tooltip placement="right" title={t("chatChannelTitle")}>
            <FloatButton
              className="!mb-1 lg:!mb-4"
              icon={<CommentOutlined className="lg:text-lg md:text-base" />}
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
      )}
    </div>
  );
};

export default OptionsComponent;
