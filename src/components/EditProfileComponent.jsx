import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import * as UserService from "../services/UserService";

const EditProfileComponent = ({ setKeySelected }) => {
  const user = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const handleEdit = async (data) => {
    const res = await UserService.updateUser(user.id, data, user.access_token);
    console.log(res);
  };

  console.log(user.gender);

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
      <form action="" onSubmit={handleSubmit(handleEdit)}>
        <div className="flex pb-2 gap-9 ">
          <div className="flex w-full gap-5">
            <div className="flex flex-col flex-1">
              <label className="text-zinc-300 min-w-[120px]">
                {t("firstName")}
              </label>
              <input
                {...register("firstName", {
                  required: "Tên là bắt buộc",
                })}
                defaultValue={user.firstName}
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
                {...register("lastName", {
                  required: "Tên là bắt buộc",
                })}
                defaultValue={user.lastName}
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
            {...register("email", {
              required: "Tên là bắt buộc",
            })}
            defaultValue={user.email}
            className="w-full outline-none py-1 bg-transparent border-b-2 focus:border-pink-700 transition-all"
            placeholder="youremail@gmail.com"
            type="email"
            // onChange={(e) => setTaskName(e.target.value)}
          />
        </div>
        <div className="flex flex-col flex-1">
          <label className="text-zinc-300 min-w-[120px]">{t("gender")}</label>
          <select
            defaultValue={user.gender}
            {...register("gender", {
              required: "Tên là bắt buộc",
            })}
            className="w-full outline-none py-1 bg-transparent border-b-2 focus:border-pink-700 transition-all"
            placeholder={t("birthdayPlaceholder")}
            // onChange={(e) => setTaskName(e.target.value)}
          >
            <option value="male">{t("male")}</option>
            <option value="female">{t("female")}</option>
          </select>
        </div>
        <div className="flex flex-col flex-1">
          <label className="text-zinc-300 min-w-[120px]">{t("birthday")}</label>
          <input
            {...register("birthday", {
              required: "Tên là bắt buộc",
            })}
            defaultValue={new Date(user.birthday).toISOString().slice(0, 10)}
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
            type="submit"
            class="group relative py-2 px-5 overflow-hidden rounded-lg bg-white shadow"
          >
            <div class="absolute inset-0 w-0 bg-pink-600 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
            <span class="relative text-black group-hover:text-white">
              {t("saveProfile")}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileComponent;
