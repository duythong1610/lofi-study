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

const OptionsComponent = ({
  userName,
  setIsModalOpen,
  handleToggleYoutube,
  toggleChat,
  toggleScreen,
  setToggleChat,
  setToggleMixer,
  setToggleScreen,
  setIsModalOpenFocusTime,
}) => {
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
        style={{
          left: 84,
        }}
        className="bg-black/10 backdrop-blur-md flex flex-col justify-around rounded-2xl p-2 w-fit h-fit top-1/2 -translate-x-[50%] -translate-y-[50%]"
      >
        <Tooltip placement="right" title="Mixed">
          <FloatButton
            icon={<SlidersOutlined />}
            className="!transition-none hover:!text-white"
            onClick={() => setToggleMixer(!toggleMixer)}
          />
        </Tooltip>
        <Tooltip placement="right" title="Screen">
          <FloatButton
            icon={<PictureOutlined />}
            className="!transition-none hover:!text-white"
            onClick={() => setToggleScreen(!toggleScreen)}
          />
        </Tooltip>

        <Tooltip placement="right" title="Focus Time">
          <FloatButton
            icon={<ClockCircleOutlined />}
            onClick={() => setIsModalOpenFocusTime(true)}
          />
        </Tooltip>
        <Tooltip placement="right" title="Youtube">
          <FloatButton
            icon={<YoutubeOutlined />}
            onClick={() => handleToggleYoutube()}
          />
        </Tooltip>

        <Tooltip placement="right" title="Chat">
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
        <Tooltip placement="right" title="Full screen">
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
