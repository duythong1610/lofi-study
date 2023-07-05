import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { useTranslation } from "react-i18next";

const FocusTimeComponent = ({
  isModalOpenFocusTime,
  setIsModalOpenFocusTime,
}) => {
  const { t } = useTranslation();
  const [taskName, setTaskName] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [listTask, setListTask] = useState([]);
  const [countdown, setCountdown] = useState(0);

  const handleStartCountdown = () => {
    setListTask((prevState) => [...prevState, { taskName, hours, minutes }]);
  };
  const [intervalId, setIntervalId] = useState(null);
  const [isCounting, setIsCounting] = useState(false);
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

  console.log(countdown, minutes, hours, listTask);

  useEffect(() => {
    if (listTask?.length > 0) {
      const totalSeconds =
        Number(listTask[0].hours) * 3600 + Number(listTask[0].minutes) * 60;
      setCountdown(totalSeconds);
      setIsCounting(true);
      setTaskName("");
      setHours("");
      setMinutes("");
    }
  }, [listTask]);

  const handleChangeHours = (e) => {
    const value = e.target.value;
    if (value <= 24) {
      setHours(value);
    }
  };

  const handleChangeMinutes = (e) => {
    const value = e.target.value;
    if (value <= 60) {
      setMinutes(value);
    }
  };

  return (
    <div>
      <Modal
        title={null}
        open={isModalOpenFocusTime}
        footer={null}
        onCancel={() => setIsModalOpenFocusTime(false)}
      >
        <h1 className="text-base font-medium">{t("timerModalTitle")}</h1>
        <div className="mt-5 flex flex-col gap-10 text-white">
          <input
            value={taskName}
            className="w-full outline-none py-1 bg-transparent border-b-2"
            placeholder={t("enterTaskNamePlaceHolder")}
            type="text"
            onChange={(e) => setTaskName(e.target.value)}
          />
          <div className="flex gap-10">
            <input
              type="number"
              min={1}
              max={24}
              value={hours}
              className="w-full outline-none py-1 bg-transparent border-b-2 !appearance-none m-0"
              placeholder={t("enterHoursPlaceHolder")}
              onChange={(e) => handleChangeHours(e)}
            />
            <input
              type="number"
              min={1}
              max={60}
              value={minutes}
              className="w-full outline-none py-1 bg-transparent border-b-2 !appearance-none m-0"
              placeholder={t("enterMinutesPlaceHolder")}
              onChange={(e) => handleChangeMinutes(e)}
            />
          </div>

          <button
            className="text-white w-[180px] m-auto bg-black py-[6px] rounded-xl hover:opacity-70 transition-all"
            onClick={() => handleStartCountdown()}
          >
            {t("getStarted")}!
          </button>
          {listTask?.length > 0 && (
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
          )}
        </div>
      </Modal>

      {countdown && (
        <Draggable positionOffset={{ x: "-50%", y: "-50%" }}>
          <div className="absolute top-1/2 left-1/2 m-0 -translate-x-[50%] -translate-y-[50%] z-10">
            {/* <div>
              <p className="text-white font-semibold md:text-base lg:text-xl neonText mb-2">
                You are {listTask[0].taskName} - Time left:
              </p>
            </div> */}
            <div className=" bg-black/30 backdrop:blur-sm md:py-2 md:px-5 lg:p-5 rounded-xl">
              <div className="font-bold cursor-move select-none flex items-center gap-3 font-digital-7">
                <h1 className="text-white md:text-8xl lg:text-9xl neonText text-center md:w-[100px] lg:w-[160px] font-digital-7">
                  {formatTime(countdown).hours}
                </h1>
                <span className="text-white md:text-8xl lg:text-9xl neonText text-center md:mb-2 lg:mb-5 font-digital-7 ">
                  :
                </span>

                <h1 className="text-white md:text-8xl lg:text-9xl neonText text-center md:w-[100px] lg:w-[160px] font-digital-7">
                  {formatTime(countdown).minutes}
                </h1>
                <span className="text-white md:text-8xl lg:text-9xl neonText text-center md:mb-2 lg:mb-5 font-digital-7">
                  :
                </span>
                <h1 className="text-white md:text-8xl lg:text-9xl neonText text-center md:w-[100px] lg:w-[160px] font-digital-7">
                  {formatTime(countdown).seconds}
                </h1>
              </div>
            </div>
          </div>
        </Draggable>
      )}
    </div>
  );
};

export default FocusTimeComponent;
