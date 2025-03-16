import axios from "axios";
import { request } from "../utils/request";

export const axiosJWT = axios.create();

export const userApi = {
  loginUser: (data) =>
    request({
      url: "/api/user/sign-in",
      method: "post",
      data,
    }),
  logoutUser: (data) =>
    request({
      url: "/api/user/log-out",
      method: "post",
      data,
    }),
  signupUser: (data) =>
    request({
      url: "/api/user/sign-up",
      method: "post",
      data,
    }),

  changePassword: (data) =>
    request({
      url: "/api/user/change-password",
      method: "post",
      data,
    }),

  forgotPassword: (data) =>
    request({
      url: "/api/user/forgot-password",
      method: "post",
      data,
    }),

  resetPassword: (data) =>
    request({
      url: "/api/user/reset-password",
      method: "post",
      data,
    }),

  getAllUser: (token) =>
    request({
      url: "/api/user/get-all",
      method: "get",
      token,
    }),

  getDetailsUser: (id, token) =>
    request({
      url: `/api/user/get-details/${id}`,
      method: "get",
      token,
    }),

  updateUser: (id, data) =>
    request({
      url: `/api/user/update-user/${id}`,
      method: "put",
      data,
    }),

  deleteUser: (id, token) =>
    request({
      url: `/api/user/delete-user/${id}`,
      method: "delete",
      token,
    }),

  deleteManyUser: (data) =>
    request({
      url: "/api/user/delete-many",
      method: "post",
      data,
    }),

  refreshToken: () =>
    request({
      url: "/api/user/refresh-token",
      method: "post",
    }),
};
