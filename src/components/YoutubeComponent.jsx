import { CloseCircleOutlined, LineOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React, { useState } from "react";
import Draggable from "react-draggable";
import ReactPlayer from "react-player";

const YoutubeComponent = ({
  toggleYoutube,
  hiddenYoutube,
  setToggleYoutube,
  setHiddenYoutube,
}) => {
  const [valueInput, setValueInput] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isUrlValid, setIsUrlValid] = useState(false);

  const handleChangeInput = (e) => {
    setValueInput(e.target.value);
  };

  const handleFindVideo = (e) => {
    if (e.keyCode === 13) {
      setYoutubeUrl(valueInput);
      setValueInput("");
    }
  };

  const handleReady = () => {
    setIsUrlValid(true);
  };
  const handleError = () => {
    setIsUrlValid(false);
  };
  return (
    <div>
      {" "}
      {toggleYoutube && (
        <Draggable handle=".handle" cancel=".close, .hide">
          <div
            className={
              hiddenYoutube
                ? "hidden"
                : "px-4 py-4 absolute flex flex-col gap-4 top-0 bottom-0 left-[15%] m-auto rounded-xl bg-black/60 max-h-[80%] h-fit backdrop-blur-sm z-20 cursor-move"
            }
          >
            <div className="flex justify-between items-center handle">
              <h1 className="text-white font-semibold">Youtube</h1>
              <div className="flex items-center gap-2">
                <Tooltip title="Hide" className="hide">
                  <LineOutlined
                    className="text-white text-xl cursor-pointer"
                    onClick={() => setHiddenYoutube(!hiddenYoutube)}
                  />
                </Tooltip>
                <Tooltip title="Close" className="close">
                  <CloseCircleOutlined
                    className="text-white text-xl cursor-pointer"
                    onClick={() => {
                      setToggleYoutube(!toggleYoutube);
                      setYoutubeUrl("");
                    }}
                  />
                </Tooltip>
              </div>
            </div>
            <div className="list flex flex-col gap-4 md:w-[350px] lg:w-[600px] h-full">
              <input
                type="text"
                value={valueInput}
                placeholder="Paste a YouTube video URL here and press enter"
                className="outline-none py-1 px-2 rounded-md bg-transparent md:text-xs lg:text-sm text-white"
                onChange={handleChangeInput}
                onKeyDown={handleFindVideo}
              />
              <div className={isUrlValid ? "block" : "hidden"}>
                <ReactPlayer
                  fallback={<p className="text-white">kkkk</p>}
                  onError={handleError}
                  onReady={handleReady}
                  controls={true}
                  width={"100%"}
                  height={"100%"}
                  url={youtubeUrl}
                ></ReactPlayer>
              </div>
              {youtubeUrl && !isUrlValid && (
                <p className={isUrlValid ? "block text-white" : "hidden"}>
                  URL not found
                </p>
              )}
            </div>
          </div>
        </Draggable>
      )}
    </div>
  );
};

export default YoutubeComponent;
