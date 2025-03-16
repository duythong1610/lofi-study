import { message } from "antd";
import axios from "axios";
import { debounce } from "lodash";
import { getToken } from "./auth";

message.config({
  duration: 1.5,
});

const debounceMessage = debounce((messageText) => {
  message.error(messageText);
}, 100);

const service = axios.create({
  baseURL: import.meta.env.VITE_API_KEY,
  timeout: 1000 * 60 * 5,
});

service.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers["token"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data;
    // if the custom code is not 20000, it is judged as an error.
    if (response.status !== 200) {
      if (
        response.status === 50008 ||
        response.status === 50012 ||
        response.status === 50014
      ) {
      }
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  (error) => {
    let status = error.response ? error.response.status : false;
    let msg = "";
    if (status) {
      msg = error.response.data.message;
    } else {
      msg = error.message;
    }

    if (!axios.isCancel(error)) debounceMessage(msg);

    return Promise.reject(error);
  }
);

export { service as request };
