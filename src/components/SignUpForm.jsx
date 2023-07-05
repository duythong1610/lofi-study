import { Modal } from "antd";
import React, { useState } from "react";
import * as UserService from "../services/UserService";
import jwt_decode from "jwt-decode";
import { updateUser } from "../redux/slides/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import * as message from "./Message";
const SignUpForm = ({ setCurrentComponent }) => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  console.log(errors);

  const handleSignUp = async (data) => {
    const res = await UserService.signupUser(data);
    if (res?.status === "OK") {
      message.success("Đăng ký thành công!");
      setIsLogin(true);
    } else {
      message.error(res.message);
    }
    console.log(res);
  };
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-center mb-5">
          {t("signUpTitle")}
        </h1>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="flex flex-col gap-5">
            <div className="flex gap-10 h-10">
              <div>
                <input
                  {...register("firstName", {
                    required: "Tên là bắt buộc",
                  })}
                  type="text"
                  className="w-full outline-none py-1 bg-transparent border-b-2 !appearance-none m-0 focus:border-pink-700 transition-all"
                  placeholder={t("firstName")}
                />
                <p className="text-xs mt-2 text-pink-600">
                  {errors?.firstName?.message}
                </p>
              </div>

              <div>
                <input
                  {...register("lastName", {
                    required: "Họ là bắt buộc",
                  })}
                  type="text"
                  className="w-full outline-none py-1 bg-transparent border-b-2 !appearance-none m-0 focus:border-pink-700 transition-all"
                  placeholder={t("lastName")}
                />
                <p className="text-xs mt-2 text-pink-600">
                  {errors?.lastName?.message}
                </p>
              </div>
            </div>
            <div className="h-10">
              <input
                {...register("email", {
                  required: "Email là bắt buộc",
                })}
                className="w-full outline-none py-1 bg-transparent border-b-2 focus:border-pink-700 transition-all"
                placeholder="youremail@gmail.com"
                type="email"
              />
              <p className="text-xs mt-2 text-pink-600">
                {errors?.email?.message}
              </p>
            </div>

            <div className="h-10">
              <input
                {...register("password", {
                  required: "Mật khẩu là bắt buộc",
                })}
                className="w-full outline-none py-1 bg-transparent border-b-2 focus:border-pink-700 transition-all"
                placeholder={t("password")}
                type="password"
              />
              <p className="text-xs mt-2 text-pink-600">
                {errors?.password?.message}
              </p>
            </div>
            <div className="h-10">
              <input
                {...register("confirmPassword", {
                  required: "Xác nhận mật khẩu là bắt buộc",
                })}
                className="w-full outline-none py-1 bg-transparent border-b-2 focus:border-pink-700 transition-all"
                placeholder={t("confirmPassword")}
                type="password"
              />
              <p className="text-xs mt-2 text-pink-600">
                {errors?.confirmPassword?.message}
              </p>
            </div>
            <div className="mt-5 flex flex-col gap-3">
              <button
                type="submit"
                class="group relative py-2 px-5 overflow-hidden rounded-lg bg-white shadow"
              >
                <div class="absolute inset-0 w-0 bg-pink-600 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                <span class="relative text-black group-hover:text-white">
                  {t("signUpTitle")}
                </span>
              </button>

              <h1 className="text-white cursor-pointer">
                {t("doYouAlreadyHaveAnAccount")}?
                <span
                  className="text-pink-600 font-bold"
                  onClick={() => setCurrentComponent("login")}
                >
                  {" "}
                  {t("loginTitle")}
                </span>
              </h1>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
