import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const AccountOverviewComponent = ({ setKeySelected }) => {
  const user = useSelector((state) => state.user);
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl">{t("profileTitle")}</h1>
      <div className="flex pb-2 gap-9">
        <h1 className="text-zinc-300 min-w-[120px]">{t("userName")}:</h1>
        <h1>
          {user.lastName} {user.firstName}
        </h1>
      </div>
      <div className="flex pb-2 gap-9">
        <h1 className="text-zinc-300 min-w-[120px]">Email:</h1>
        <h1>{user.email}</h1>
      </div>
      <div className="flex pb-2 gap-9">
        <h1 className="text-zinc-300 min-w-[120px]">{t("gender")}:</h1>
        <h1>{t(user?.gender)}</h1>
      </div>

      <div className="text-end mt-5">
        <button
          class="group relative py-2 px-5 overflow-hidden rounded-lg bg-white shadow"
          onClick={() => setKeySelected("editProfile")}
        >
          <div class="absolute inset-0 w-0 bg-pink-600 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
          <span class="relative text-black group-hover:text-white">
            {t("editProfile")}
          </span>
        </button>
      </div>
    </div>
  );
};

export default AccountOverviewComponent;
