import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import * as UserService from "../services/UserService";
import * as message from "./Message";

const ChangePasswordComponent = ({ setKeySelected }) => {
  const user = useSelector((state) => state.user);
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const handleChangePassword = async (data) => {
    const res = await UserService.changePassword({
      ...data,
      userId: user.id,
    });
    console.log(res);
    if (res.status === "ERR" || res.status === "ERROR") {
      message.error(res.message);
    } else {
      message.success(res.message);
    }
  };
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl">{t("changePassword")}</h1>

      <form onSubmit={handleSubmit(handleChangePassword)}>
        <div className="flex flex-col flex-1">
          <label className="text-zinc-300 min-w-[120px]">
            {t("currentPassword")}
          </label>
          <input
            {...register("currentPassword", {
              required: "Tên là bắt buộc",
            })}
            className="w-full outline-none py-1 bg-transparent border-b-2 focus:border-pink-700 transition-all"
            placeholder={t("currentPasswordPlaceholder")}
            type="text"
          />
        </div>
        <div className="flex flex-col flex-1">
          <label className="text-zinc-300 min-w-[120px]">
            {t("newPassword")}
          </label>
          <input
            {...register("newPassword", {
              required: "Tên là bắt buộc",
            })}
            className="w-full outline-none py-1 bg-transparent border-b-2 focus:border-pink-700 transition-all"
            placeholder={t("newPasswordPlaceholder")}
            type="text"
          />
        </div>
        <div className="flex flex-col flex-1">
          <label className="text-zinc-300 min-w-[120px]">
            {t("confirmNewPassword")}
          </label>
          <input
            {...register("confirmNewPassword", {
              required: "Tên là bắt buộc",
            })}
            className="w-full outline-none py-1 bg-transparent border-b-2 focus:border-pink-700 transition-all"
            placeholder={t("confirmNewPasswordPlaceholder")}
            type="text"
          />
        </div>

        <div className="text-end mt-5">
          <button
            class="group relative py-2 px-5 overflow-hidden rounded-lg hover:text-pink-600"
            onClick={() => setKeySelected("accountOverview")}
          >
            {t("cancel")}
          </button>
          <button
            type="submit"
            class="group relative py-2 px-5 overflow-hidden rounded-lg bg-white shadow"
          >
            <div class="absolute inset-0 w-0 bg-pink-600 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
            <span class="relative text-black group-hover:text-white">
              {t("updatePasswordTitle")}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordComponent;
