import React from "react";
import Draggable from "react-draggable";

const TimeLeftComponent = ({ countdown, listTask }) => {
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

  return (
    <div>
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
    </div>
  );
};

export default TimeLeftComponent;
