import { Radio } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getCurrentLang } from "../utils/i18n";
import i18n from "i18next";

const LanguageComponent = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState(localStorage.getItem("i18nextLng"));
  const options = [
    {
      label: "Tiếng Việt",
      value: "vi",
    },
    {
      label: "English",
      value: "en",
    },
  ];
  const onChange = ({ target: { value } }) => {
    console.log("radio4 checked", value);
    localStorage.setItem("i18nextLng", value);
    i18n.changeLanguage(value);
    setValue(value);
  };

  useEffect(() => {
    getCurrentLang();
  }, [value]);
  return (
    <div>
      <h1 className="text-sm mb-2">{t("language")}</h1>{" "}
      <Radio.Group
        options={options}
        onChange={onChange}
        value={value}
        optionType="button"
        buttonStyle="solid"
      />
    </div>
  );
};

export default LanguageComponent;
