import { Modal } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/slides/userSlice";
import * as UserService from "../services/UserService";
import ForgotPasswordForm from "./ForgotPasswordForm";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
const LoginComponent = ({
  isModalOpen,
  setIsModalOpen,
  isLogin,
  setIsLogin,
}) => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);

  const [currentComponent, setCurrentComponent] = useState("login");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  console.log(errors);

  const dispatch = useDispatch();

  return (
    <div>
      {" "}
      <Modal
        width={400}
        title={null}
        open={isModalOpen && !user.id}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        // className="min-h-[400px]"
      >
        {currentComponent === "login" && (
          <LoginForm
            setIsModalOpen={setIsModalOpen}
            setCurrentComponent={setCurrentComponent}
          />
        )}
        {currentComponent === "signup" && (
          <SignUpForm setCurrentComponent={setCurrentComponent} />
        )}

        {currentComponent === "forgot" && (
          <ForgotPasswordForm setCurrentComponent={setCurrentComponent} />
        )}
      </Modal>
    </div>
  );
};

export default LoginComponent;
