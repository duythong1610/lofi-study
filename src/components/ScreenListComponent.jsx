import { CloseCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ScreenListComponent = ({
  handleChangeScreen,
  bgSelected,
  toggleScreen,
  setToggleScreen,
}) => {
  const [data, setData] = useState("");

  async function logJSONData() {
    const response = await fetch("./data.json");
    const jsonData = await response.json();
    setData(jsonData);
  }
  useEffect(() => {
    logJSONData();
  }, []);

  return (
    <div>
      {toggleScreen && (
        <div className="pl-4 py-4 absolute flex flex-col gap-4 top-0 bottom-0 left-[152px] m-auto rounded-xl bg-black/10 max-h-[600px] backdrop-blur-sm z-20">
          <div className="flex justify-between items-center">
            <h1 className="text-white font-semibold">
              All Screen ({data.length})
            </h1>
            <Tooltip title="Hide">
              <CloseCircleOutlined
                className="pr-4 text-white text-xl cursor-pointer"
                onClick={() => setToggleScreen(!toggleScreen)}
              />
            </Tooltip>
          </div>
          <div className="list flex flex-col gap-4 w-[300px] h-full overflow-auto">
            {data?.map((item) => {
              return (
                <div
                  key={item.id}
                  className={
                    item.video === bgSelected
                      ? "border-[2px] border-white rounded-xl item relative w-full min-h-[160px] cursor-pointer"
                      : "item relative min-h-[160px] w-full cursor-pointer opacity-70"
                  }
                  onClick={() => handleChangeScreen(item)}
                >
                  <LazyLoadImage
                    height={"100%"}
                    effect="blur"
                    src={item.background}
                    alt=""
                    className="w-full object-cover rounded-xl"
                  />
                  <h1 className="text-white text-3xl whitespace-nowrap font-semibold absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                    {item.name}
                  </h1>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScreenListComponent;
