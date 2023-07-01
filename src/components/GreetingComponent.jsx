import axios from "axios";
import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const GreetingComponent = () => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);
  const [quotes, setQuotes] = useState("");
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
    greeting = t("greetingNight");
  } else if (currentHour > 6 && currentHour < 12) {
    greeting = t("greetingMorning");
  } else if (currentHour > 12 < 18) {
    greeting = t("greetingAfternoon");
  }

  const fetchRandomQuotes = async () => {
    const result = await axios.get("https://api.quotable.io/random");
    console.log(result);
    setQuotes(`"${result.data.content}"`);
  };

  useEffect(() => {
    fetchRandomQuotes();
  }, []);

  return (
    <div>
      {" "}
      <Draggable positionOffset={{ x: "65vw", y: "75vh" }} scale={1}>
        <div className="!cursor-move w-[500px] inline-block absolute top-0 left-0 overflow-hidden">
          <div className="mb-10">
            <h1 className="text-white font-medium text-2xl neonText">
              {greeting}
              {user.firstName && ", " + user.firstName}
            </h1>
            <h1 className="text-white font-medium text-xl neonText">
              It's {currentTimeUS}
            </h1>
          </div>
          <p className="text-white font-medium text-base neonText italic">
            {quotes.replace(";", " ")}
          </p>
        </div>
      </Draggable>
    </div>
  );
};

export default GreetingComponent;
