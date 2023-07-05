import { Modal } from "antd";
import React, { useState } from "react";
import * as UserService from "../services/UserService";

import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import * as message from "./Message";
import { useForm } from "react-hook-form";
const ForgotPasswordForm = ({ setCurrentComponent }) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const handleForgotPassword = async (data) => {
    const res = await UserService.forgotPassword(data);
    console.log(res);
  };

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-center mb-5">
          {t("forgotPassword")}
        </h1>
        <form onSubmit={handleSubmit(handleForgotPassword)}>
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
              <div className="text-end">
                <h1
                  className="text-sm text-pink-600 cursor-pointer font-medium inline"
                  onClick={() => {
                    setCurrentComponent("login");
                  }}
                >
                  {t("loginTitle")}?
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
                  {t("sendRequire")}
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
