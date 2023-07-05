import { CloseCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { io } from "socket.io-client";
const socket = io.connect(import.meta.env.VITE_API_SOCKET_KEY);
import EmojiPicker, { EmojiStyle, Emoji } from "emoji-picker-react";
import data from "@emoji-mart/data/sets/14/apple.json";
import Picker from "@emoji-mart/react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const ChatChannelComponent = ({
  userName,
  isUser,
  toggleChat,
  setToggleChat,
  messages,
  messageChat,
  setMessageChat,
  setMessages,
}) => {
  const user = useSelector((state) => state.user);
  const { t } = useTranslation();
  const messagesEndRef = useRef(null);
  const [isOpenEmoji, setIsOpenEmoji] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const custom = [
    {
      id: "github",
      name: "GitHub",
      emojis: [
        {
          id: "octocat",
          name: "Octocat",
          keywords: ["github"],
          skins: [
            {
              src: "https://mcdn.coolmate.me/image/October2021/meme-cheems-1.png",
            },
          ],
        },
        {
          id: "shipit",
          name: "Squirrel",
          keywords: ["github"],
          skins: [
            { src: "./shipit-1.png" },
            { src: "./shipit-2.png" },
            { src: "./shipit-3.png" },
            { src: "./shipit-4.png" },
            { src: "./shipit-5.png" },
            { src: "./shipit-6.png" },
          ],
        },
      ],
    },
    {
      id: "gifs",
      name: "GIFs",
      emojis: [
        {
          id: "party_parrot",
          name: "Party Parrot",
          keywords: ["dance", "dancing"],
          skins: [{ src: "./party_parrot.gif" }],
        },
      ],
    },
  ];

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = (e) => {
    if (e.keyCode === 13 && messageChat.trim()) {
      socket.emit("send_message", {
        userId: user.id,
        messageChat,
        userName: `${user.firstName} ${user.lastName}`,
        timeChat: getCurrentSocketTime(),
      });
      setMessageChat("");
      setIsOpenEmoji(false);
    }
  };

  const onClick = (emojiData, event) => {
    console.log(emojiData);
    setMessageChat((prevValue) => prevValue + emojiData.native);
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
  return (
    <div>
      {" "}
      {toggleChat && user.id && (
        <Draggable scale={1} handle=".handle" cancel=".close">
          <div className="px-4 py-4 absolute flex md:w-[270px] lg:w-[400px] flex-col md:gap-2 lg:gap-4 top-0 bottom-0 md:left-[calc(5%+50px)] m-auto rounded-xl bg-black/60 max-h-[90%] lg:max-h-[600px] backdrop-blur-sm z-20">
            <div className="handle flex justify-between items-center cursor-move">
              <h1 className="text-white font-semibold ">
                {t("chatChannelTitle")}
              </h1>
              <Tooltip title="Close" className="close">
                <CloseCircleOutlined
                  className="close text-white text-xl cursor-pointer"
                  onClick={() => setToggleChat(!toggleChat)}
                />
              </Tooltip>
            </div>
            <div className="relative md:h-[75%] lg:h-[480px] max-h-[480px]">
              <div className="max-h-full overflow-y-auto overflow-x-hidden">
                {messages?.map((mess, index) => {
                  return (
                    <div
                      key={index}
                      className="md:text-xs lg:text-sm gap-2 w-full text-white break-words "
                    >
                      <span className="text-zinc-300 mr-2">
                        {mess.timeChat} {mess.userName}:
                      </span>
                      {mess.messageChat}
                    </div>
                  );
                })}{" "}
                <div ref={messagesEndRef} className="mt-2" />
              </div>
              {isOpenEmoji && (
                <div className="fixed top-[80px] left-0 right-0 m-auto">
                  <Picker
                    set="apple"
                    data={data}
                    onEmojiSelect={onClick}
                    // onClickOutside={() => setIsOpenEmoji(false)}
                    custom={custom}
                  />
                </div>
              )}
              <div className="absolute -bottom-10 w-full">
                {/* {selectedEmoji ? (
                  <Emoji
                    unified={selectedEmoji}
                    emojiStyle={EmojiStyle.APPLE}
                    size={30}
                  />
                ) : null} */}
                <div className="flex items-center relative">
                  <input
                    placeholder={t("chatChannelPlaceholder")}
                    className="w-full text-sm md:text-sm lg:text-base outline-none py-1 bg-transparent text-white border-b-2 z-10"
                    value={messageChat}
                    type="text"
                    name=""
                    id=""
                    onChange={(e) => setMessageChat(e.target.value)}
                    onKeyDown={sendMessage}
                  />

                  <div
                    className="absolute right-0 top-0 z-50 cursor-pointer"
                    onClick={() => setIsOpenEmoji(!isOpenEmoji)}
                  >
                    <Emoji
                      unified="1f600"
                      size="25"
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Draggable>
      )}
    </div>
  );
};

export default ChatChannelComponent;
