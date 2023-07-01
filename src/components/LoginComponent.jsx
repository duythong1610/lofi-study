import { Modal } from "antd";
import React, { useState } from "react";
import * as UserService from "../services/UserService";
import jwt_decode from "jwt-decode";
import { updateUser } from "../redux/slides/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const LoginComponent = ({
  isModalOpen,
  setIsModalOpen,
  isLogin,
  setIsLogin,
}) => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [messageError, setMessageError] = useState("");

  const dispatch = useDispatch();

  const handleGetDetailUser = async (id, access_token) => {
    const storage = localStorage.getItem("refresh_token");
    const refreshToken = JSON.parse(storage);
    const res = await UserService.getDetailsUser(id, access_token);
    dispatch(
      updateUser({ ...res?.data, access_token: access_token, refreshToken })
    );
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const res = await UserService.loginUser({ email, password });
    if (res?.status === "OK") {
      // message.success("Đăng nhập thành công!");
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

  const handleSignUp = async (e) => {
    e.preventDefault();
    const res = await UserService.signupUser({
      email,
      password,
      confirmPassword,
    });
    if (res?.status === "OK") {
      // message.success("Đăng nhập thành công!");
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
      {" "}
      <Modal
        width={350}
        title={null}
        open={isModalOpen && !user.id}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        className="min-h-[400px]"
      >
        {isLogin ? (
          <div>
            <h1 className="text-2xl font-bold text-center mb-5">
              {t("loginTitle")}
            </h1>
            <form onSubmit={handleSignIn}>
              <div className="mt-5 flex flex-col gap-5 text-white">
                <div>
                  <input
                    // value={taskName}
                    className="w-full outline-none py-1 bg-transparent border-b-2 focus:border-pink-700 transition-all"
                    placeholder="youremail@gmail.com"
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    // value={taskName}
                    className="w-full outline-none py-1 bg-transparent border-b-2 focus:border-pink-700 transition-all"
                    placeholder={t("password")}
                    type="text"
                    onChange={(e) => setPassword(e.target.value)}
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
                    className="text-white w-full m-auto bg-pink-700 py-[6px] rounded-xl hover:opacity-70 transition-all"
                  >
                    {t("loginTitle")}
                  </button>
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
        ) : (
          <div>
            <h1 className="text-2xl font-bold text-center mb-5">
              {t("signUpTitle")}
            </h1>
            <form>
              <div className="flex flex-col gap-5">
                <div className="flex gap-10">
                  <input
                    type="text"
                    // value={hours}
                    className="w-full outline-none py-1 bg-transparent border-b-2 !appearance-none m-0 focus:border-pink-700 transition-all"
                    placeholder={t("firstName")}
                    // onChange={(e) => handleChangeHours(e)}
                  />
                  <input
                    type="text"
                    // value={minutes}
                    className="w-full outline-none py-1 bg-transparent border-b-2 !appearance-none m-0 focus:border-pink-700 transition-all"
                    placeholder={t("lastName")}
                    // onChange={(e) => handleChangeMinutes(e)}
                  />
                </div>
                <div>
                  <input
                    // value={taskName}
                    className="w-full outline-none py-1 bg-transparent border-b-2 focus:border-pink-700 transition-all"
                    placeholder="youremail@gmail.com"
                    type="email"
                    // onChange={(e) => setTaskName(e.target.value)}
                  />
                </div>

                <div>
                  <input
                    // value={taskName}
                    className="w-full outline-none py-1 bg-transparent border-b-2 focus:border-pink-700 transition-all"
                    placeholder={t("password")}
                    type="password"
                    // onChange={(e) => setTaskName(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    // value={taskName}
                    className="w-full outline-none py-1 bg-transparent border-b-2 focus:border-pink-700 transition-all"
                    placeholder={t("confirmPassword")}
                    type="password"
                    // onChange={(e) => setTaskName(e.target.value)}
                  />
                </div>
                <div className="mt-5 flex flex-col gap-3">
                  <button
                    className="text-white w-full m-auto bg-pink-700 py-[6px] rounded-xl hover:opacity-70 transition-all"
                    onClick={() => handleStartCountdown()}
                  >
                    {t("signUpTitle")}
                  </button>
                  <h1 className="text-white cursor-pointer">
                    {t("doYouAlreadyHaveAnAccount")}?
                    <span
                      className="text-pink-600 font-bold"
                      onClick={() => setIsLogin(true)}
                    >
                      {" "}
                      {t("loginTitle")}
                    </span>
                  </h1>
                </div>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default LoginComponent;
