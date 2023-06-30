import React from "react";
import Draggable from "react-draggable";

const GreetingComponent = () => {
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
  const currentHour = currentTime.getHours({ hour12: false });
  let greeting;

  if (currentHour < 6 || currentHour > 18) {
    greeting = "Good Evening!";
  } else if (currentHour > 6 && currentHour < 12) {
    greeting = "Good Morning!";
  } else if (currentHour > 12 < 18) {
    greeting = "Good Afternoon!";
  }
  return (
    <div>
      {" "}
      <Draggable positionOffset={{ x: "65vw", y: "75vh" }} scale={1}>
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
    </div>
  );
};

export default GreetingComponent;
