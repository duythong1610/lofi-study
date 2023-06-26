import React, { useRef, useState } from "react";

const MixerComponent = ({ toggleMixer, setToggleMixer }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleAudio = () => {
    if (!isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const changeVolume = (event) => {
    audioRef.current.volume = event.target.value;
    localStorage.setItem("volume", event.target.value);
  };

  return (
    <div>
      {" "}
      {toggleMixer && (
        <div className="pl-4 py-4 absolute flex flex-col gap-4 top-0 bottom-0 left-[152px] m-auto rounded-xl bg-black/10 max-h-[600px] backdrop-blur-sm z-20">
          <div className="flex justify-between items-center">
            <h1 className="text-white font-semibold">Mixer</h1>
            <Tooltip title="Hide">
              <CloseCircleOutlined
                className="pr-4 text-white text-xl cursor-pointer"
                onClick={() => setToggleMixer(!toggleMixer)}
              />
            </Tooltip>
          </div>
          <div className="list flex flex-col gap-4 w-[300px] h-full overflow-auto">
            <button onClick={() => handleAudio()}>
              {!isPlaying ? "Phát" : "Dừng"}
            </button>

            <input
              className="slider"
              defaultValue={currentVolume}
              type="range"
              min="0"
              max="1"
              step="0.01"
              onChange={changeVolume}
            />
          </div>
          <audio controls ref={audioRef} className="hidden">
            <source
              src="https://storage.googleapis.com/my-image-products/relaxCat.mp3"
              type="audio/mpeg"
            />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default MixerComponent;
