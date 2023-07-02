import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const ChangePasswordComponent = ({ setKeySelected }) => {
  const user = useSelector((state) => state.user);
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-5">
      {/* <div className="text-center w-full">
        <img
          src="https://tiki.vn/blog/wp-content/uploads/2023/03/gojou-luc-nhan.webp"
          alt=""
          className="w-[100px] h-[100px] rounded-full m-auto"
        />
      </div> */}
      <h1 className="text-xl">{t("changePassword")}</h1>

      <div className="flex flex-col flex-1">
        <label className="text-zinc-300 min-w-[120px]">
          {t("currentPassword")}
        </label>
        <input
          className="w-full outline-none py-1 bg-transparent border-b-2 focus:border-pink-700 transition-all"
          placeholder={t("currentPasswordPlaceholder")}
          type="email"
          // onChange={(e) => setTaskName(e.target.value)}
        />
      </div>
      <div className="flex flex-col flex-1">
        <label className="text-zinc-300 min-w-[120px]">
          {t("newPassword")}
        </label>
        <input
          className="w-full outline-none py-1 bg-transparent border-b-2 focus:border-pink-700 transition-all"
          placeholder={t("newPasswordPlaceholder")}
          type="email"
          // onChange={(e) => setTaskName(e.target.value)}
        />
      </div>
      <div className="flex flex-col flex-1">
        <label className="text-zinc-300 min-w-[120px]">
          {t("confirmNewPassword")}
        </label>
        <input
          className="w-full outline-none py-1 bg-transparent border-b-2 focus:border-pink-700 transition-all"
          placeholder={t("confirmNewPasswordPlaceholder")}
          type="email"
          // onChange={(e) => setTaskName(e.target.value)}
        />
      </div>

      <div className="text-end mt-5">
        {/* <button
          className="py-2 px-5 bg-pink-700 rounded-xl opacity-75 hover:opacity-100 transition-all"
          onClick={() => setKeySelected("editProfile")}
        >
          {t("editProfile")}
        </button> */}
        <button
          class="group relative py-2 px-5 overflow-hidden rounded-lg hover:text-pink-600"
          onClick={() => setKeySelected("accountOverview")}
        >
          {t("cancel")}
        </button>
        <button
          class="group relative py-2 px-5 overflow-hidden rounded-lg bg-white shadow"
          onClick={() => setKeySelected("editProfile")}
        >
          <div class="absolute inset-0 w-0 bg-pink-600 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
          <span class="relative text-black group-hover:text-white">
            {t("updatePasswordTitle")}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ChangePasswordComponent;
