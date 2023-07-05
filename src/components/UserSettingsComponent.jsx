import React, { useState } from "react";
import AccountOverviewComponent from "./AccountOverviewComponent";
import EditProfileComponent from "./EditProfileComponent";
import LanguageComponent from "./LanguageComponent";
import {
  EditOutlined,
  HomeOutlined,
  LockFilled,
  UserOutlined,
} from "@ant-design/icons";
import { getItem } from "../utils/util";
import { useTranslation } from "react-i18next";
import { Menu, Modal } from "antd";
import ChangePasswordComponent from "./ChangePasswordComponent";

const UserSettingsComponent = ({
  isUserSettingsOpen,
  setIsUserSettingsOpen,
}) => {
  const { t } = useTranslation();

  const [openKeys, setOpenKeys] = useState(["user"]);
  const [keySelected, setKeySelected] = useState("accountOverview");

  const renderPage = (key) => {
    switch (key) {
      case "accountOverview":
        return <AccountOverviewComponent setKeySelected={setKeySelected} />;
      case "editProfile":
        return <EditProfileComponent setKeySelected={setKeySelected} />;
      case "changePassword":
        return <ChangePasswordComponent setKeySelected={setKeySelected} />;
      case "language":
        return <LanguageComponent />;
      default:
        return;
    }
  };
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const handleOnClick = ({ key }) => {
    setKeySelected(key);
  };

  const items = [
    getItem(
      t("accountOverview"),
      "accountOverview",
      <HomeOutlined className="!text-base" />
    ),
    getItem(
      t("editProfile"),
      "editProfile",
      <EditOutlined className="!text-base" />
    ),
    getItem(
      t("changePassword"),
      "changePassword",
      <LockFilled className="!text-base" />
    ),
    getItem(t("language"), "language", <UserOutlined />),
  ];
  return (
    <div>
      {" "}
      <Modal
        width={"800px"}
        className=""
        bodyStyle={{ minHeight: "70vh" }}
        title={null}
        open={isUserSettingsOpen}
        footer={null}
        onCancel={() => setIsUserSettingsOpen(false)}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          <Menu
            selectedKeys={keySelected}
            defaultSelectedKeys={keySelected}
            onClick={handleOnClick}
            style={{
              width: 256,
              background: "transparent",
              color: "#FFF",
            }}
            onOpenChange={onOpenChange}
            mode="inline"
            items={items}
          />

          <div style={{ flex: 1, padding: "15px", marginLeft: 20 }}>
            {renderPage(keySelected)}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserSettingsComponent;
