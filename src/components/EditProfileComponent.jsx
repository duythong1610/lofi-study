import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const EditProfileComponent = ({ setKeySelected }) => {
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
      <h1 className="text-xl">{t("editProfile")}</h1>
      <div className="flex pb-2 gap-9 ">
        <div className="flex w-full gap-5">
          <div className="flex flex-col flex-1">
            <label className="text-zinc-300 min-w-[120px]">
              {t("firstName")}
            </label>
            <input
              value={user.firstName}
              className="w-full outline-none py-1 bg-transparent border-b-2 focus:border-pink-700 transition-all"
              placeholder={t("enterFirstNamePlaceHolder")}
              type="text"
              // onChange={(e) => setTaskName(e.target.value)}
            />
          </div>
          <div className="flex flex-col flex-1">
            <label className="text-zinc-300 min-w-[120px]">
              {t("lastName")}
            </label>
            <input
              value={user.lastName}
              className="w-full outline-none py-1 bg-transparent border-b-2 focus:border-pink-700 transition-all"
              placeholder={t("enterLastNamePlaceHolder")}
              type="text"
              // onChange={(e) => setTaskName(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <label className="text-zinc-300 min-w-[120px]">{t("Email")}</label>
        <input
          value={user.email}
          className="w-full outline-none py-1 bg-transparent border-b-2 focus:border-pink-700 transition-all"
          placeholder="youremail@gmail.com"
          type="email"
          // onChange={(e) => setTaskName(e.target.value)}
        />
      </div>
      <div className="flex flex-col flex-1">
        <label className="text-zinc-300 min-w-[120px]">{t("gender")}</label>
        <select
          className="w-full outline-none py-1 bg-transparent border-b-2 focus:border-pink-700 transition-all"
          placeholder={t("birthdayPlaceholder")}
          // onChange={(e) => setTaskName(e.target.value)}
        >
          <option value={0}>Nam</option>
          <option value={1}>Nữ</option>
        </select>
      </div>
      <div className="flex flex-col flex-1">
        <label className="text-zinc-300 min-w-[120px]">{t("birthday")}</label>
        <input
          value={new Date().toISOString().slice(0, 10)}
          className="w-full outline-none py-1 bg-transparent border-b-2 focus:border-pink-700 transition-all"
          placeholder={t("birthdayPlaceholder")}
          type="date"
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
            {t("saveProfile")}
          </span>
        </button>
      </div>
    </div>
  );
};

export default EditProfileComponent;
