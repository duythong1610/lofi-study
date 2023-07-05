import { Modal } from "antd";
import React, { useState } from "react";
import * as UserService from "../services/UserService";
import jwt_decode from "jwt-decode";
import { updateUser } from "../redux/slides/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import * as message from "./Message";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
const LoginComponent = ({
  isModalOpen,
  setIsModalOpen,
  isLogin,
  setIsLogin,
}) => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [messageError, setMessageError] = useState("");
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

  const handleGetDetailUser = async (id, access_token) => {
    const storage = localStorage.getItem("refresh_token");
    const refreshToken = JSON.parse(storage);
    const res = await UserService.getDetailsUser(id, access_token);
    dispatch(
      updateUser({ ...res?.data, access_token: access_token, refreshToken })
    );
  };

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
