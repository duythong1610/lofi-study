import React from "react";

const ScreenComponent = ({ bgItem, bgSelected }) => {
  return (
    <div>
      {" "}
      {bgSelected?.length > 0 && (
        <div>
          <video
            key={bgItem?.id}
            className="fixed right-0 bottom-0 min-w-full min-h-screen max-w transition-all object-cover"
            autoPlay={true}
            muted
            loop
          >
            <source
              src={
                bgSelected
                  ? bgSelected
                  : "https://storage.googleapis.com/my-image-products/attack.webm"
              }
              type="video/webm"
            />
          </video>
        </div>
      )}
    </div>
  );
};

export default ScreenComponent;
