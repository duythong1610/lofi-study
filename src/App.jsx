import { useEffect, useRef, useState } from "react";
import "./index.css";
import ReactPlayer from "react-player";
import Draggable from "react-draggable";
import {
  PictureOutlined,
  CloseCircleOutlined,
  FullscreenOutlined,
  ClockCircleOutlined,
  SlidersOutlined,
  YoutubeOutlined,
  LineOutlined,
} from "@ant-design/icons";
import { FloatButton, Tooltip } from "antd";
import { Slider } from "antd";

function App() {
  const [bgItem, setBgItem] = useState("");

  const [valueInput, setValueInput] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [bgSelected, setBgSelected] = useState(localStorage.getItem("bg"));
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUrlValid, setIsUrlValid] = useState(false);
  const audioRef = useRef(null);

  const [toggleScreen, setToggleScreen] = useState(false);
  const [toggleMixer, setToggleMixer] = useState(false);
  const [toggleYoutube, setToggleYoutube] = useState(false);
  const [hiddenYoutube, setHiddenYoutube] = useState(false);

  const handleAudio = () => {
    if (!isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleReady = () => {
    setIsUrlValid(true);
  };
  const handleError = () => {
    setIsUrlValid(false);
  };

  const changeVolume = (event) => {
    audioRef.current.volume = event.target.value;
    localStorage.setItem("volume", event.target.value);
  };

  const currentVolume = localStorage.getItem("volume");

  const data = [
    {
      id: 1,
      name: "Levi",
      background:
        "https://storage.googleapis.com/my-image-products/attack.webm",
    },
    {
      id: 2,
      name: "Joker",
      background: "https://storage.googleapis.com/my-image-products/joker.webm",
    },
    {
      id: 3,
      name: "Gojo",
      background: "https://storage.googleapis.com/my-image-products/gojo.webm",
    },
    {
      id: 4,
      name: "Broly",
      background: "https://storage.googleapis.com/my-image-products/broly.webm",
    },
    {
      id: 5,
      name: "Dead Pool",
      background:
        "https://storage.googleapis.com/my-image-products/deadpool.webm",
    },
    {
      id: 6,
      name: "Spider Man",
      background:
        "https://storage.googleapis.com/my-image-products/spiderman.webm",
    },
    {
      id: 7,
      name: "Saitama",
      background:
        "https://storage.googleapis.com/my-image-products/saitama.webm",
    },
    {
      id: 8,
      name: "Super Man",
      background:
        "https://storage.googleapis.com/my-image-products/superman.mp4",
    },
    {
      id: 9,
      name: "Iron Man",
      background:
        "https://storage.googleapis.com/my-image-products/ironman.webm",
    },
    {
      id: 10,
      name: "Zenitsu",
      background:
        "https://storage.googleapis.com/my-image-products/zenitsu.webm",
    },
    {
      id: 11,
      name: "Naruto",
      background: "https://storage.googleapis.com/my-image-products/naruto.mp4",
    },
    {
      id: 12,
      name: "Nature",
      background:
        "https://storage.googleapis.com/my-image-products/nature.webm",
    },
    {
      id: 13,
      name: "Attack On Titan",
      background:
        "https://storage.googleapis.com/my-image-products/attackontitan.mp4",
    },
    {
      id: 14,
      name: "Tanjiro",
      background:
        "https://storage.googleapis.com/my-image-products/tanjiro1.webm",
    },
    {
      id: 15,
      name: "Tanjiro & Nezuko",
      background:
        "https://storage.googleapis.com/my-image-products/tanjuro_nezuko.webm",
    },
    {
      id: 16,
      name: "Zenisu 1",
      background:
        "https://storage.googleapis.com/my-image-products/zenisuchargeblade.webm",
    },
    {
      id: 17,
      name: "Ryomen Sakuna",
      background:
        "https://storage.googleapis.com/my-image-products/ryomensakuna.webm",
    },
    {
      id: 18,
      name: "Golden Frieza",
      background:
        "https://storage.googleapis.com/my-image-products/goldenfrieza.webm",
    },
    {
      id: 19,
      name: "Chainsaw Man",
      background:
        "https://storage.googleapis.com/my-image-products/chainsawman.webm",
    },
    {
      id: 20,
      name: "Eren Yeager",
      background:
        "https://storage.googleapis.com/my-image-products/erenyeager1.webm",
    },
    {
      id: 21,
      name: "Eren Yeager 1",
      background:
        "https://storage.googleapis.com/my-image-products/erenyeager2.webm",
    },
    {
      id: 22,
      name: "Kimetsu no Yaiba",
      background:
        "https://storage.googleapis.com/my-image-products/kimetsuno yaiba.webm",
    },
  ];

  const handleChangeScreen = (item) => {
    setBgItem(item);
    localStorage.setItem("bg", item.background);
    setBgSelected(localStorage.getItem("bg"));
  };

  const handleToggleYoutube = () => {
    if (!toggleYoutube) {
      setToggleYoutube(!toggleYoutube);
    } else {
      setHiddenYoutube(!hiddenYoutube);
    }
  };

  const handleChangeInput = (e) => {
    setValueInput(e.target.value);
  };

  const handleFindVideo = (e) => {
    if (e.keyCode === 13) {
      setYoutubeUrl(valueInput);
      setValueInput("");
    }
  };

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

  const currentTimeUS = new Date().toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const currentTime = new Date();

  const currentHour = currentTime.getHours();
  let greeting;

  if (currentHour < 12) {
    greeting = "Good Morning!";
  } else if (currentHour < 18) {
    greeting = "Good Afternoon!";
  } else {
    greeting = "Good Evening!";
  }

  console.log(bgItem);
  console.log(bgSelected);
  return (
    <>
      <div className="relative h-screen max-h-screen overflow-hidden">
        <div>
          <video
            key={bgItem?.id}
            className="fixed right-0 bottom-0 min-w-full min-h-screen transition-all"
            autoPlay={true}
            muted
            loop
          >
            <source
              src={
                bgSelected
                  ? bgSelected
                  : "https://storage.googleapis.com/my-image-products/attack.webm"
              }
              type="video/webm"
            />
          </video>
        </div>
        <audio controls ref={audioRef} className="hidden">
          <source
            src="https://storage.googleapis.com/my-image-products/relaxCat.mp3"
            type="audio/mpeg"
          />
          Your browser does not support the audio element.
        </audio>

        <Draggable defaultPosition={{ x: 1000, y: 500 }} scale={1}>
          <div className="!cursor-move w-[500px] inline-block absolute top-0 left-0 overflow-hidden">
            <div className="mb-10">
              <h1 className="text-white font-medium text-2xl neonText">
                {greeting}!
              </h1>
              <h1 className="text-white font-medium text-xl neonText">
                It's {currentTimeUS}
              </h1>
            </div>
            <p className="text-white font-medium text-base neonText italic">
              "Keep your face always toward the sunshine, and shadows will fall
              behind you."
            </p>
          </div>
        </Draggable>
        <div>
          <FloatButton.Group
            style={{
              top: "30%",
              left: 84,
            }}
            className="bg-black/10 backdrop-blur-md flex flex-col bottom-[30%] justify-around rounded-2xl p-2 w-fit "
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
              <FloatButton icon={<ClockCircleOutlined />} />
            </Tooltip>
            <Tooltip placement="right" title="Youtube">
              <FloatButton
                icon={<YoutubeOutlined />}
                onClick={() => handleToggleYoutube()}
              />
            </Tooltip>
            <Tooltip placement="right" title="Full screen">
              <FloatButton
                icon={<FullscreenOutlined />}
                onClick={() => handleFullScreen()}
              />
            </Tooltip>
          </FloatButton.Group>
          {toggleScreen && (
            <div className="pl-4 py-4 absolute flex flex-col gap-4 top-0 bottom-0 left-[152px] m-auto rounded-xl bg-black/10 max-h-[600px] backdrop-blur-sm z-20">
              <div className="flex justify-between items-center">
                <h1 className="text-white font-semibold">
                  All Screen ({data.length})
                </h1>
                <Tooltip title="Hide">
                  <CloseCircleOutlined
                    className="pr-4 text-white text-xl cursor-pointer"
                    onClick={() => setToggleScreen(!toggleScreen)}
                  />
                </Tooltip>
              </div>
              <div className="list flex flex-col gap-4 w-[300px] h-full overflow-auto">
                {data.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className={
                        item.background === bgSelected
                          ? "border-[2px] border-white rounded-xl item relative w-full cursor-pointer"
                          : "item relative w-full cursor-pointer opacity-70"
                      }
                      onClick={() => handleChangeScreen(item)}
                    >
                      <video
                        src={item.background}
                        alt=""
                        className="w-full h-[190px] object-cover rounded-xl"
                      />
                      <h1 className="text-white text-3xl whitespace-nowrap font-semibold absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                        {item.name}
                      </h1>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {toggleMixer && (
            <div className="pl-4 py-4 absolute flex flex-col gap-4 top-0 bottom-0 left-[152px] m-auto rounded-xl bg-black/10 max-h-[600px] backdrop-blur-sm z-20">
              <div className="flex justify-between items-center">
                <h1 className="text-white font-semibold">Mixed</h1>
                <Tooltip title="Hide">
                  <CloseCircleOutlined
                    className="pr-4 text-white text-xl cursor-pointer"
                    onClick={() => setToggleMixer(!toggleMixer)}
                  />
                </Tooltip>
              </div>
              <div className="list flex flex-col gap-4 w-[300px] h-full overflow-auto">
                <button onClick={() => handleAudio()}>
                  {!isPlaying ? "Phát" : "Dừng"}
                </button>

                <input
                  className="slider"
                  defaultValue={currentVolume}
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  onChange={changeVolume}
                />
              </div>
            </div>
          )}

          {toggleYoutube && (
            <Draggable>
              <div
                className={
                  hiddenYoutube
                    ? "hidden"
                    : "px-4 py-4 absolute flex flex-col gap-4 top-0 bottom-0 left-[152px] m-auto rounded-xl bg-black/10 max-h-[400px] backdrop-blur-sm z-20 cursor-move"
                }
              >
                <div className="flex justify-between items-center">
                  <h1 className="text-white font-semibold">Youtube</h1>
                  <div className="flex items-center gap-2">
                    <Tooltip title="Hide">
                      <LineOutlined
                        className="text-white text-xl cursor-pointer"
                        onClick={() => setHiddenYoutube(!hiddenYoutube)}
                      />
                    </Tooltip>
                    <Tooltip title="Close">
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
                <div className="list flex flex-col gap-4 w-[600px] h-full overflow-auto">
                  <input
                    type="text"
                    value={valueInput}
                    placeholder="Paste a YouTube video URL here and press enter"
                    className="outline-none py-1 px-2 rounded-md bg-transparent text-white"
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
      </div>
    </>
  );
}

export default App;
