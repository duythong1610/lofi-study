import { useEffect, useRef, useState } from "react";
import "./index.css";
import Draggable from "react-draggable";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Modal } from "antd";
import ScreenComponent from "./components/ScreenComponent";
import ScreenListComponent from "./components/ScreenListComponent";
import MixerComponent from "./components/MixerComponent";
import YoutubeComponent from "./components/YoutubeComponent";
import ChatChannelComponent from "./components/ChatChannelComponent";
import OptionsComponent from "./components/OptionsComponent";
import GreetingComponent from "./components/GreetingComponent";
import FocusTimeComponent from "./components/FocusTimeComponent";
import HeaderComponent from "./components/HeaderComponent";
import jwt_decode from "jwt-decode";
import * as UserService from "./services/UserService";
import { updateUser } from "./redux/slides/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  playTrack,
  pauseTrack,
  nextTrack,
  prevTrack,
  fetchTracks,
} from "./redux/slides/playlistSlice";
import { isJsonString } from "./utils/util";
import Home from "./pages/Home";

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    setIsLoading(true);
    const { storageData, decoded } = handleDecoded();
    if (decoded?.id) {
      console.log(decoded);
      handleGetDetailUser(decoded?.id, storageData);
    }
    setIsLoading(false);
  }, []);

  const handleDecoded = () => {
    let storageData =
      user?.access_token || localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData) && !user?.access_token) {
      storageData = JSON.parse(storageData);
      decoded = jwt_decode(storageData);
    }
    return { decoded, storageData };
  };

  UserService.axiosJWT.interceptors.request.use(
    async (config) => {
      const currentTime = new Date();

      const { decoded } = handleDecoded();
      let storageRefreshToken = localStorage.getItem("refresh_token");
      const refreshToken = JSON.parse(storageRefreshToken);
      const decodedRefreshToken = jwt_decode(refreshToken);
      if (decoded?.exp < currentTime.getTime() / 1000) {
        if (decodedRefreshToken?.exp > currentTime.getTime() / 1000) {
          const data = await UserService.refreshToken(refreshToken);
          config.headers["token"] = `Bearer ${data?.access_token}`;
        } else {
          await UserService.logoutUser();
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          // message.success("Đăng xuất thành công!");
          dispatch(resetUser());
        }
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  const handleGetDetailUser = async (id, access_token) => {
    let storageRefreshToken = localStorage.getItem("refresh_token");
    const refreshToken = JSON.parse(storageRefreshToken);
    const res = await UserService.getDetailsUser(id, access_token);
    dispatch(
      updateUser({
        ...res?.data,
        access_token: access_token,
        refreshToken: refreshToken,
      })
    );
  };

  console.log(user);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
