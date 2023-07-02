import { Modal } from "antd";
import React, { useState } from "react";
import * as UserService from "../services/UserService";
import jwt_decode from "jwt-decode";
import { updateUser } from "../redux/slides/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import * as message from "./Message";
const LoginForm = ({ setIsModalOpen, setIsLogin }) => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [messageError, setMessageError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  console.log(errors);

  const dispatch = useDispatch();

  const handleGetDetailUser = async (id, access_token) => {
    const storage = localStorage.getItem("refresh_token");
    const refreshToken = JSON.parse(storage);
    const res = await UserService.getDetailsUser(id, access_token);
    dispatch(
      updateUser({ ...res?.data, access_token: access_token, refreshToken })
    );
  };

  const handleSignIn = async (data) => {
    const res = await UserService.loginUser(data);
    if (res?.status === "OK") {
      message.success("Đăng nhập thành công!");
      setIsModalOpen(false);
      localStorage.setItem("access_token", JSON.stringify(res?.access_token));
      localStorage.setItem("refresh_token", JSON.stringify(res?.refresh_token));

      if (res?.access_token) {
        const decoded = jwt_decode(res?.access_token);
        if (decoded.id) {
          handleGetDetailUser(decoded.id, res?.access_token);
        }
      }
    } else {
      setMessageError(data?.message);
    }
    console.log(res);
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
                // value={taskName}
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
                // value={taskName}
                className="w-full outline-none py-1 bg-transparent border-b-2 focus:border-pink-700 transition-all"
                placeholder={t("password")}
                type="text"
              />
            </div>
            <div>
              <div className="text-end">
                <h1 className="text-sm text-pink-600 cursor-pointer font-medium">
                  {t("forgotPassword")}?
                </h1>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3">
              <button
                type="submit"
                class="group relative py-2 px-5 overflow-hidden rounded-lg bg-white shadow"
              >
                <div class="absolute inset-0 w-0 bg-pink-600 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                <span class="relative text-black group-hover:text-white">
                  {t("loginTitle")}
                </span>
              </button>
              {/* <button
                    type="submit"
                    className="text-white w-full m-auto bg-pink-700 py-[6px] rounded-xl hover:opacity-70 transition-all"
                  >
                    {t("loginTitle")}
                  </button> */}
              <h1 className="text-white cursor-pointer">
                {t("doNotHaveAnAccount")}
                <span
                  className="text-pink-600 font-bold"
                  onClick={() => setIsLogin(false)}
                >
                  {" "}
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
