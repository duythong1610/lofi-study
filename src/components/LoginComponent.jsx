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

  const handleSignIn = async (data) => {
    const res = await UserService.loginUser(data);
    if (res?.status === "OK") {
      message.success("Đăng nhập thành công!");
      setIsModalOpen(false);
      localStorage.setItem("access_token", JSON.stringify(res?.access_token));
      localStorage.setItem("refresh_token", JSON.stringify(res?.refresh_token));

      if (res?.access_token) {
        const decoded = jwt_decode(res?.access_token);
        if (decoded.id) {
          handleGetDetailUser(decoded.id, res?.access_token);
        }
      }
    } else {
      setMessageError(data?.message);
    }
    console.log(res);
  };

  const handleSignUp = async (data) => {
    const res = await UserService.signupUser(data);
    if (res?.status === "OK") {
      message.success("Đăng ký thành công!");
      setIsLogin(true);
    } else {
      message.error(res.message);
    }
    console.log(res);
  };
  return (
    <div>
      {" "}
      <Modal
        width={350}
        title={null}
        open={isModalOpen && !user.id}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        // className="min-h-[400px]"
      >
        {isLogin ? (
          <LoginForm setIsLogin={setIsLogin} setIsModalOpen={setIsModalOpen} />
        ) : (
          <SignUpForm setIsLogin={setIsLogin} />
        )}
      </Modal>
    </div>
  );
};

export default LoginComponent;
