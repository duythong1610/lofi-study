import axios from "axios";
import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Resizable } from "react-resizable";

const GreetingComponent = () => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);
  const isShowGreeting = useSelector((state) => state.settings.isShowGreeting);

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
      {isShowGreeting && (
        <div>
          <Draggable positionOffset={{ x: "65vw", y: "60vh" }} scale={1}>
            <div className="cursor-pointer w-[70%] md:w-[30%] lg:w-[500px] z-10  overflow-hidden">
              <div className="mb-3 lg:mb-10">
                <h1 className="text-white font-medium text-lg lg:text-2xl neonText">
                  {greeting}
                  {user.firstName && ", " + user.firstName}
                </h1>
                <h1 className="text-white font-medium text-sm lg:text-xl neonText">
                  {t("itIs")} {currentTimeLocale}
                </h1>
              </div>
              <p className="text-white font-medium text-xs lg:text-sm neonText italic">
                {quotes.replace(";", " ")}
              </p>
            </div>
          </Draggable>
        </div>
      )}
    </div>
  );
};

export default GreetingComponent;
