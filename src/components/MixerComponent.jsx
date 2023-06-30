import { CloseCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Howl } from "howler";
import { useDispatch, useSelector } from "react-redux";
import {
  pauseTrack,
  playTrack,
  selectTrack,
} from "../redux/slides/playlistSlice";
import ReactAudioPlayer from "react-audio-player";

const MixerComponent = ({ toggleMixer, setToggleMixer }) => {
  const tracks = useSelector((state) => state.playlist.tracks);
  const selectedTrack = useSelector(
    (state) => state.playlist.currentTrackIndex
  );
  const isPlaying = useSelector((state) => state.playlist.isPlaying);

  const dispatch = useDispatch();

  const [playlistSelected, setPlaylistSelected] = useState(
    localStorage.getItem("playlist")
  );
  const audioRef = useRef(null);
  const currentVolume = localStorage.getItem("volume");
  const [sound, setSound] = useState(null);

  console.log(playlistSelected);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [dataSounds, setDataSounds] = useState("");

  async function logJSONData() {
    const responseSounds = await fetch("./sound.json");

    const jsonSoundData = await responseSounds.json();
    setDataSounds(jsonSoundData);
  }
  useEffect(() => {
    logJSONData();
  }, []);

  console.log(dataSounds);

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unload();
      }
    };
  }, [sound]);

  const handleChangePlaylist = (item, trackIndex) => {
    localStorage.setItem("playlist", trackIndex);
    setPlaylistSelected(localStorage.getItem("playlist"));
    dispatch(playTrack());
    dispatch(selectTrack(trackIndex));
  };

  const handleTimeUpdate = (e) => {
    console.log(e.target.currentTime);
    setCurrentTime(e.target.currentTime);
    setDuration(e.target.duration);
  };

  const handleSeek = (time) => {
    if (audioRef.current) {
      audioRef.current.audioEl.current.currentTime = time;
    }
  };

  useEffect(() => {
    const audioElement = audioRef.current?.audioEl?.current;
    if (audioElement) {
      const handleTimeUpdate = () => {
        setCurrentTime(audioElement.currentTime);
      };

      const handleDurationChange = () => {
        setDuration(audioElement.duration);
      };

      audioElement.addEventListener("timeupdate", handleTimeUpdate);
      audioElement.addEventListener("durationchange", handleDurationChange);

      return () => {
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
        audioElement.removeEventListener(
          "durationchange",
          handleDurationChange
        );
      };
    }
  }, [selectedTrack]);

  const changeVolume = (event) => {
    audioRef.current.volume = event.target.value;
    localStorage.setItem("volume", event.target.value);
  };

  const [sounds, setSounds] = useState([]);

  // Xử lý sự kiện thay đổi giá trị của thanh trượt âm lượng cho âm thanh cụ thể

  useEffect(() => {
    const newSounds =
      Array.isArray(dataSounds) &&
      dataSounds.map((soundItem) => {
        const newSound = new Howl({
          src: [soundItem.url],
          volume: 0,
          loop: true,
        });

        return {
          ...soundItem,
          howl: newSound,
          isPlaying: false,
        };
      });

    setSounds(newSounds);
  }, [dataSounds]);

  const handleVolumeChange = (index, event) => {
    const newSounds = [...sounds];
    const newVolume = parseFloat(event.target.value);

    if (newVolume > 0 && !newSounds[index].isPlaying) {
      newSounds[index].isPlaying = true;
      newSounds[index].howl.play();
    } else if (newVolume === 0 && newSounds[index].isPlaying) {
      newSounds[index].isPlaying = false;
      newSounds[index].howl.stop();
    }

    newSounds[index].howl.volume(newVolume);
    setSounds(newSounds);
  };

  console.log(currentTime);

  return (
    <div>
      {" "}
      {toggleMixer && (
        // <div className="pl-4 py-4 absolute flex flex-col gap-4 top-0 bottom-0 left-[152px] m-auto rounded-xl bg-black/60 max-h-[600px] backdrop-blur-sm z-20">
        //   <div className="flex justify-between items-center">
        //     <h1 className="text-white font-semibold">Mixer</h1>
        //     <Tooltip title="Hide">
        //       <CloseCircleOutlined
        //         className="pr-4 text-white text-xl cursor-pointer"
        //         onClick={() => setToggleMixer(!toggleMixer)}
        //       />
        //     </Tooltip>
        //   </div>
        //   <div className="list flex flex-col gap-4 w-[300px] h-full overflow-auto">
        //     <button onClick={() => handleAudio()}>
        //       {!isPlaying ? "Phát" : "Dừng"}
        //     </button>

        //     <input
        //       className="slider"
        //       defaultValue={currentVolume}
        //       type="range"
        //       min="0"
        //       max="1"
        //       step="0.01"
        //       onChange={changeVolume}
        //     />
        //   </div>
        //   <audio controls ref={audioRef} className="hidden">
        //     <source
        //       src="https://storage.googleapis.com/my-image-products/relaxCat.mp3"
        //       type="audio/mpeg"
        //     />
        //     Your browser does not support the audio element.
        //   </audio>
        // </div>
        <div className="pl-4 pb-4 pt-0 absolute flex flex-col  top-0 bottom-0 right-[calc(5%+50px)] m-auto rounded-xl bg-black/60 max-h-[600px] backdrop-blur-sm z-20">
          <div className="text-right py-2">
            <Tooltip title="Hide">
              <CloseCircleOutlined
                className="pr-4 text-white text-xl cursor-pointer"
                onClick={() => setToggleMixer(!toggleMixer)}
              />
            </Tooltip>
          </div>
          <div className="list flex flex-col gap-4 w-[300px] h-full overflow-auto">
            <h1 className="text-white mb-0 text-base font-bold">Playlist:</h1>

            {tracks?.map((item, index) => {
              return (
                <div
                  key={item.id}
                  className={
                    index === selectedTrack
                      ? "border-[2px] border-white rounded-xl item relative w-full min-h-[160px] cursor-pointer"
                      : "item relative min-h-[160px] w-full cursor-pointer opacity-70"
                  }
                  onClick={() => handleChangePlaylist(item, index)}
                >
                  <LazyLoadImage
                    height={"100%"}
                    effect="blur"
                    src={item.background}
                    alt=""
                    className="w-full object-cover rounded-xl"
                  />
                  <h1 className="text-white text-3xl whitespace-nowrap font-semibold absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 !opacity-100">
                    {item.playlistName}
                  </h1>
                </div>
              );
            })}

            <h1 className="text-white mb-0 text-base font-bold mt-5">
              All Sounds:
            </h1>
            {dataSounds?.map((item, index) => {
              return (
                <div key={item.id}>
                  <div className="list flex gap-4 w-[300px] h-full overflow-auto">
                    {/* <button onClick={() => handleAudio()}>
                      {!isPlaying ? "Phát" : "Dừng"}
                    </button> */}
                    <div className="w-[120px]">
                      <h1 className="text-zinc-300 text-sm font-medium">
                        {item.soundName}
                      </h1>
                    </div>

                    <input
                      className="slider"
                      defaultValue={0}
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={item.howl?.volume()}
                      onChange={(event) => handleVolumeChange(index, event)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MixerComponent;