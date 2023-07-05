import { CloseCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ScreenListComponent = ({
  handleChangeScreen,
  bgSelected,
  toggleScreen,
  setToggleScreen,
}) => {
  const { t } = useTranslation();
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
        <div className="px-4 py-4 absolute flex flex-col gap-4 top-0 bottom-0 left-[calc(5%+35px)] lg:left-[calc(5%+50px)] m-auto rounded-xl bg-black/60 max-h-[90%] lg:max-h-[600px] backdrop-blur-sm z-20">
          <div className="flex justify-between items-center">
            <h1 className="text-white font-semibold">
              {t("allScreenTitle")} ({data.length})
            </h1>
            <Tooltip title="Hide">
              <CloseCircleOutlined
                className="text-white text-xl cursor-pointer"
                onClick={() => setToggleScreen(!toggleScreen)}
              />
            </Tooltip>
          </div>
          <div className="list flex flex-col gap-4 w-[200px] lg:w-[300px] h-full overflow-auto overflow-x-hidden">
            {data?.map((item) => {
              return (
                <div
                  key={item.id}
                  className={
                    item.video === bgSelected
                      ? "border-[2px] border-white rounded-xl item relative w-full min-h-[114px] lg:min-h-[170px] cursor-pointer"
                      : "item relative min-h-[114px] lg:min-h-[170px] w-full cursor-pointer opacity-70"
                  }
                  onClick={() => handleChangeScreen(item)}
                >
                  <LazyLoadImage
                    height={"100%"}
                    effect="blur"
                    src={item.background}
                    alt=""
                    className="w-full object-cover rounded-xl !inline-block"
                  />
                  <h1 className="text-white text-lg lg:text-3xl w-full font-semibold absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 !opacity-100 line-clamp-2 text-center px-4">
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
