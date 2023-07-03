import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clear interval khi component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const formatTime = (date) => {
    let hours = date.getHours();
    let amPm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes} ${amPm}`;
  };
  return (
    <div>
      <p className="text-white font-medium md:text-sm lg:text-base">
        {formatTime(currentTime)}
      </p>
    </div>
  );
};

export default CurrentTime;
