import { Modal } from "antd";
import React, { useEffect, useState } from "react";

const FocusTimeComponent = ({
  listTask,
  setListTask,
  isModalOpenFocusTime,
  setIsModalOpenFocusTime,
}) => {
  const [taskName, setTaskName] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const handleStartCountdown = () => {
    setListTask((prevState) => [...prevState, { taskName, hours, minutes }]);
  };

  console.log(taskName);

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
  return (
    <div>
      <Modal
        title="Hey bro, you are so hard working, let's get started!"
        open={isModalOpenFocusTime}
        footer={null}
        onCancel={() => setIsModalOpenFocusTime(false)}
      >
        <div className="mt-5 flex flex-col gap-10">
          <input
            value={taskName}
            className="w-full outline-none py-1 bg-transparent border-b-2"
            placeholder="Enter Task name"
            type="text"
            onChange={(e) => setTaskName(e.target.value)}
          />
          <div className="flex gap-10">
            <input
              type="number"
              value={hours}
              className="w-full outline-none py-1 bg-transparent border-b-2"
              placeholder="Enter hours"
              onChange={(e) => setHours(e.target.value)}
            />
            <input
              type="number"
              value={minutes}
              className="w-full outline-none py-1 bg-transparent border-b-2"
              placeholder="Enter minutes"
              onChange={(e) => setMinutes(e.target.value)}
            />
          </div>

          <button
            className="text-white w-[180px] m-auto bg-black py-[6px] rounded-xl hover:opacity-70 transition-all"
            onClick={() => handleStartCountdown()}
          >
            Get started!
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
    </div>
  );
};

export default FocusTimeComponent;
