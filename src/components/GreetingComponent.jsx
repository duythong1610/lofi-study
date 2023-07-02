import axios from "axios";
import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const GreetingComponent = () => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentTimeLocale, setCurrentTimeLocale] = useState(
    new Date().toLocaleString(t("currentLang"), {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      // hour: "numeric",
      // minute: "numeric",
      hour12: true,
    })
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
      setCurrentTimeLocale(
        new Date().toLocaleString(t("currentLang"), {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
          // hour: "numeric",
          // minute: "numeric",
          hour12: true,
        })
      );
    }, 1000);

    // Clear interval khi component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const [quotes, setQuotes] = useState("");

  // const currentTime = new Date();
  const currentHour = currentTime.getHours({ hour12: false });
  let greeting;

  if (currentHour < 6 || currentHour > 18) {
    greeting = t("greetingNight");
  } else if (currentHour > 6 && currentHour < 12) {
    greeting = t("greetingMorning");
  } else if (currentHour > 12 < 18) {
    greeting = t("greetingAfternoon");
  }

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  console.log(formatTime(currentTime));

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
              {t("itIs")} {currentTimeLocale}
            </h1>
          </div>
          <p className="text-white font-medium text-sm neonText italic">
            {quotes.replace(";", " ")}
          </p>
        </div>
      </Draggable>
    </div>
  );
};

export default GreetingComponent;
