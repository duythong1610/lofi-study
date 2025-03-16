import { Button, Modal, Spin } from "antd";
import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import { updateUser } from "../redux/slides/userSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import * as message from "./Message";
import { userApi } from "../services/UserService";
const LoginForm = ({ setIsModalOpen, setCurrentComponent }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const dispatch = useDispatch();

  const handleGetDetailUser = async (id, access_token) => {
    const storage = localStorage.getItem("refresh_token") || "";
    const refreshToken = storage;
    try {
      const res = await userApi.getDetailsUser(id, access_token);
      dispatch(
        updateUser({ ...res?.data, access_token: access_token, refreshToken })
      );
    } catch (error) {}
  };

  const handleSignIn = async (data) => {
    try {
      setIsLoading(true);
      const res = await userApi.loginUser(data);
      console.log(res);
      setIsModalOpen(false);
      localStorage.setItem("access_token", JSON.stringify(res?.access_token));
      localStorage.setItem("refresh_token", JSON.stringify(res?.refresh_token));

      if (res?.access_token) {
        const decoded = jwt_decode(res?.access_token);
        if (decoded.id) {
          await handleGetDetailUser(decoded.id, res?.access_token);
          message.success("Đăng nhập thành công!");
        }
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-center mb-5">
          {t("loginTitle")}
        </h1>
        <form onSubmit={handleSubmit(handleSignIn)}>
          <div className="mt-5 flex flex-col gap-5 text-white">
            <div>
              <input
                {...register("email", {
                  required: "Email là bắt buộc",
                })}
                className="w-full outline-none py-1 bg-transparent border-b-2 focus:border-pink-700 transition-all"
                placeholder="youremail@gmail.com"
                type="text"
              />
            </div>
            <div>
              <input
                {...register("password", {
                  required: "Mật khẩu là bắt buộc",
                })}
                className="w-full outline-none py-1 bg-transparent border-b-2 focus:border-pink-700 transition-all"
                placeholder={t("password")}
                type="password"
              />
            </div>
            <div>
              <div className="text-end">
                <h1
                  className="text-sm text-pink-600 cursor-pointer font-medium inline"
                  onClick={() => {
                    setCurrentComponent("forgot");
                  }}
                >
                  {t("forgotPassword")}?
                </h1>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3">
              <Spin spinning={isLoading}>
                <button
                  type="submit"
                  class="group relative py-2 px-5 overflow-hidden rounded-lg bg-white shadow w-full"
                >
                  <div class="absolute inset-0 w-0 bg-pink-600 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                  <span class="relative text-black group-hover:text-white">
                    {t("loginTitle")}
                  </span>
                </button>
              </Spin>

              <h1 className="text-white cursor-pointer">
                {t("doNotHaveAnAccount")}
                <span
                  className="text-pink-600 font-bold ml-1"
                  onClick={() => setCurrentComponent("signup")}
                >
                  {t("signUpTitle")}
                </span>
              </h1>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
