import { Modal } from "antd";
import React from "react";

const LoginComponent = ({
  isModalOpen,
  setIsModalOpen,
  isLogin,
  setIsLogin,
}) => {
  return (
    <div>
      {" "}
      <Modal
        width={350}
        title={null}
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        className="min-h-[400px]"
      >
        {isLogin ? (
          <div>
            <h1 className="text-2xl font-bold text-center mb-5">Login</h1>
            <form className="min-h-[200px]">
              <div className="mt-5 flex flex-col gap-5 text-white">
                <input
                  // value={taskName}
                  className="w-full outline-none py-1 bg-transparent border-b-2"
                  placeholder="Username"
                  type="text"
                  // onChange={(e) => setTaskName(e.target.value)}
                />
                <input
                  // value={taskName}
                  className="w-full outline-none py-1 bg-transparent border-b-2"
                  placeholder="Password"
                  type="text"
                  // onChange={(e) => setTaskName(e.target.value)}
                />
              </div>
            </form>
            <div className="flex flex-col gap-3">
              <button
                className="text-white w-full m-auto bg-pink-700 py-[6px] rounded-xl hover:opacity-70 transition-all"
                onClick={() => handleStartCountdown()}
              >
                Login
              </button>
              <h1 className="text-white cursor-pointer">
                Do not have an account?
                <span
                  className="text-pink-600 font-bold"
                  onClick={() => setIsLogin(false)}
                >
                  {" "}
                  Sign up
                </span>
              </h1>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold text-center mb-5">Sign Up</h1>
            <div className="flex gap-10">
              <input
                type="text"
                // value={hours}
                className="w-full outline-none py-1 bg-transparent border-b-2 !appearance-none m-0"
                placeholder="First name"
                // onChange={(e) => handleChangeHours(e)}
              />
              <input
                type="text"
                // value={minutes}
                className="w-full outline-none py-1 bg-transparent border-b-2 !appearance-none m-0"
                placeholder="Last Name"
                // onChange={(e) => handleChangeMinutes(e)}
              />
            </div>
            <div className="mt-5 flex flex-col gap-10 text-white">
              <input
                // value={taskName}
                className="w-full outline-none py-1 bg-transparent border-b-2"
                placeholder="Your email..."
                type="text"
                // onChange={(e) => setTaskName(e.target.value)}
              />
              <input
                // value={taskName}
                className="w-full outline-none py-1 bg-transparent border-b-2"
                placeholder="Password"
                type="text"
                // onChange={(e) => setTaskName(e.target.value)}
              />
              <input
                // value={taskName}
                className="w-full outline-none py-1 bg-transparent border-b-2"
                placeholder="Confirm password"
                type="text"
                // onChange={(e) => setTaskName(e.target.value)}
              />

              <button
                className="text-white w-full m-auto bg-pink-700 py-[6px] rounded-xl hover:opacity-70 transition-all"
                onClick={() => handleStartCountdown()}
              >
                Sign up
              </button>
              <h1 className="text-white cursor-pointer">
                Do you already have an account?{" "}
                <span
                  className="text-pink-600 font-bold"
                  onClick={() => setIsLogin(true)}
                >
                  {" "}
                  Login
                </span>
              </h1>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default LoginComponent;
