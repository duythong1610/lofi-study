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
  CommentOutlined,
} from "@ant-design/icons";
import { FloatButton, Modal, Tooltip } from "antd";
import { Slider } from "antd";
import { io } from "socket.io-client";
const socket = io.connect("https://socket-server-2cuv.onrender.com");

function App() {
  const [bgItem, setBgItem] = useState("");
  const [data, setData] = useState("");

  const [messageChat, setMessageChat] = useState("");
  const [messages, setMessages] = useState([]);
  const [valueInput, setValueInput] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [bgSelected, setBgSelected] = useState(localStorage.getItem("bg"));
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUrlValid, setIsUrlValid] = useState(false);
  const audioRef = useRef(null);
  const messagesEndRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenFocusTime, setIsModalOpenFocusTime] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [userName, setUsername] = useState("");

  const [taskName, setTaskName] = useState("");
  const [listTask, setListTask] = useState([]);
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [isCounting, setIsCounting] = useState(false);

  const [toggleScreen, setToggleScreen] = useState(false);
  const [toggleMixer, setToggleMixer] = useState(false);
  const [toggleYoutube, setToggleYoutube] = useState(false);
  const [toggleChat, setToggleChat] = useState(false);
  const [hiddenYoutube, setHiddenYoutube] = useState(false);

  async function logJSONData() {
    const response = await fetch("./data.json");
    const jsonData = await response.json();
    setData(jsonData);
  }
  useEffect(() => {
    logJSONData();
  }, []);

  console.log(data);

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

  const handleStartCountdown = () => {
    setListTask((prevState) => [...prevState, { taskName, hours, minutes }]);
  };

  useEffect(() => {
    if (listTask.length > 0) {
      const totalSeconds =
        Number(listTask[0].hours) * 3600 + Number(listTask[0].minutes) * 60;
      setCountdown(totalSeconds);
      setIsCounting(true);
      setTaskName("");
      setHours("");
      setMinutes("");
    }
  }, [listTask]);

  console.log(listTask[0]);

  const handleStopCountdown = () => {
    clearInterval(intervalId);
    setIsCounting(false);
  };

  useEffect(() => {
    if (isCounting) {
      const id = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      setIntervalId(id);
    } else {
      clearInterval(intervalId);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [isCounting]);

  useEffect(() => {
    if (countdown === 0) {
      handleStopCountdown();
    }
  }, [countdown]);

  const getCurrentSocketTime = () => {
    const currentDate = new Date();

    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    const meridiem = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    minutes = minutes < 10 ? "0" + minutes : minutes;

    const socketTime = `${hours}:${minutes} ${meridiem}`;
    return socketTime;
  };

  const sendMessage = (e) => {
    if (e.keyCode === 13 && messageChat.trim()) {
      socket.emit("send_message", {
        messageChat,
        userName,
        timeChat: getCurrentSocketTime(),
      });
      setMessageChat("");
    }
  };

  useEffect(() => {
    const handleUserChat = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on("user-chat", handleUserChat);

    return () => {
      socket.off("user-chat", handleUserChat);
    };
  }, []);

  console.log(messages);

  const changeVolume = (event) => {
    audioRef.current.volume = event.target.value;
    localStorage.setItem("volume", event.target.value);
  };

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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const currentVolume = localStorage.getItem("volume");

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
  console.log(currentTime);

  const currentHour = currentTime.getHours({ hour12: false });
  let greeting;
  console.log(currentHour);

  if (currentHour < 6 || currentHour > 18) {
    greeting = "Good Evening!";
  } else if (currentHour > 6 && currentHour < 12) {
    greeting = "Good Morning!";
  } else if (currentHour > 12 < 18) {
    greeting = "Good Afternoon!";
  }

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
    };
  };

  console.log(countdown);

  return (
    <>
      <div className="relative h-screen max-h-screen overflow-hidden w-screen">
        {countdown && (
          <Draggable positionOffset={{ x: "-50%", y: "-50%" }}>
            <div className="absolute top-1/2 left-1/2 m-0 -translate-x-[50%] -translate-y-[50%] z-10">
              <div>
                <p className="text-white font-semibold text-xl neonText text-center">
                  You are {listTask[0].taskName} - Left time:
                </p>
              </div>
              <div className="font-semibold cursor-move select-none flex items-center gap-3 font-digital-7">
                <h1 className="text-white text-8xl neonText text-center w-[160px] font-digital-7">
                  {formatTime(countdown).hours}
                </h1>
                <span className="text-white text-8xl neonText text-center mb-5 font-digital-7 ">
                  :
                </span>

                <h1 className="text-white text-8xl neonText text-center w-[160px] font-digital-7">
                  {formatTime(countdown).minutes}
                </h1>
                <span className="text-white text-8xl neonText text-center mb-5 font-digital-7">
                  :
                </span>
                <h1 className="text-white text-8xl neonText text-center w-[160px] font-digital-7">
                  {formatTime(countdown).seconds}
                </h1>
              </div>
            </div>
          </Draggable>
        )}

        <div>
          <video
            key={bgItem?.id}
            className="fixed right-0 bottom-0 min-w-full min-h-screen transition-all object-cover"
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
                {greeting}
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
                <h1 className="text-white font-semibold">Mixer</h1>
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
                    : "px-4 py-4 absolute flex flex-col gap-4 top-0 bottom-0 left-[152px] m-auto rounded-xl bg-black/30 max-h-fit backdrop-blur-sm z-20 cursor-move"
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
                <div className="list flex flex-col gap-4 w-[600px] h-full">
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

          {toggleChat && isUser && (
            <Draggable scale={1}>
              <div className="pl-4 py-4 absolute flex w-[400px] flex-col gap-4 top-0 bottom-0 left-[152px] m-auto rounded-xl bg-black/50 max-h-[600px] backdrop-blur-sm z-20 cursor-move">
                <div className="flex justify-between items-center">
                  <h1 className="text-white font-semibold">Chat Channel</h1>
                  <Tooltip title="Close">
                    <CloseCircleOutlined
                      className="pr-4 text-white text-xl cursor-pointer"
                      onClick={() => setToggleChat(!toggleChat)}
                    />
                  </Tooltip>
                </div>
                <div className="relative h-[480px] max-h-[480px]">
                  <div className="max-h-full overflow-y-auto overflow-x-hidden">
                    {messages.map((mess, index) => {
                      return (
                        <div key={index} className="flex gap-2 w-full">
                          <div className="whitespace-nowrap flex gap-2">
                            <p className="text-zinc-300 text-sm">
                              {mess.timeChat}
                            </p>
                            <h1 className="text-zinc-300 text-sm">
                              {mess.userName}:
                            </h1>
                          </div>
                          {/* <div className="flex-shrink break-all"> */}
                          <span className="text-white text-sm break-all">
                            {mess.messageChat}
                          </span>
                          {/* </div> */}
                        </div>
                      );
                    })}{" "}
                    <div ref={messagesEndRef} className="mt-2" />
                  </div>
                  <div className="absolute -bottom-10 w-full pr-4">
                    <input
                      placeholder="Enter chat content here...."
                      className="w-full outline-none py-1 bg-transparent text-white border-b-2"
                      value={messageChat}
                      type="text"
                      name=""
                      id=""
                      onChange={(e) => setMessageChat(e.target.value)}
                      onKeyDown={sendMessage}
                    />
                  </div>
                </div>
              </div>
            </Draggable>
          )}

          <Modal
            title="What's your name?"
            open={isModalOpen}
            footer={null}
            onCancel={() => setIsModalOpen(false)}
          >
            <div className="mt-5">
              <input
                className="w-full outline-none py-1 bg-transparent text-white border-b-2"
                placeholder="Enter your name to display in chat channel..."
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleSubmit}
              />
            </div>
          </Modal>

          <Modal
            title="Hey bro, you are so hard working, let's get started!"
            open={isModalOpenFocusTime}
            footer={null}
            onCancel={() => setIsModalOpenFocusTime(false)}
          >
            <div className="mt-5 flex flex-col gap-10">
              <input
                value={taskName}
                className="w-full outline-none py-1 bg-transparent text-white border-b-2"
                placeholder="Enter Task name"
                type="text"
                onChange={(e) => setTaskName(e.target.value)}
              />
              <div className="flex gap-10">
                <input
                  value={hours}
                  className="w-full outline-none py-1 bg-transparent text-white border-b-2"
                  placeholder="Enter hours"
                  type="text"
                  onChange={(e) => setHours(e.target.value)}
                />
                <input
                  value={minutes}
                  className="w-full outline-none py-1 bg-transparent text-white border-b-2"
                  placeholder="Enter minutes"
                  type="text"
                  onChange={(e) => setMinutes(e.target.value)}
                />
              </div>

              <button
                className="text-white w-[180px] m-auto bg-black py-[6px] rounded-xl"
                onClick={() => handleStartCountdown()}
              >
                Get started!
              </button>
              <div>
                <h1 className="text-white">
                  Task in progress:
                  {listTask.map((item) => {
                    return (
                      <div>
                        <p className="text-white">{item.taskName}</p>
                      </div>
                    );
                  })}
                </h1>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default App;
