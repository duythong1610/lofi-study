import { CloseCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React, { useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { io } from "socket.io-client";
const socket = io.connect("http://localhost:3002/");

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
  const messagesEndRef = useRef(null);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
        userId: "6499a3252327a10edeb889b5",
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
  return (
    <div>
      {" "}
      {toggleChat && isUser && (
        <Draggable scale={1}>
          <div className="pl-4 py-4 absolute flex w-[400px] flex-col gap-4 top-0 bottom-0 left-[152px] m-auto rounded-xl bg-black/60 max-h-[600px] backdrop-blur-sm z-20 cursor-move">
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
                {messages?.map((mess, index) => {
                  return (
                    <div key={index} className="flex gap-2 w-full">
                      <div className="whitespace-nowrap flex gap-2">
                        <p className="text-zinc-300 text-sm">{mess.timeChat}</p>
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
    </div>
  );
};

export default ChatChannelComponent;
