import Image from "next/image";
import React from "react";
import carelife_logo from "../../../public/carelife_new_logo.svg";
import copyright from "../../../public/copyright.svg";
import LoginForm from "../LoginForm/LoginForm";

const Login = () => {
  return (
    <div className="flex">
      <div className="w-1/2 bg-white p-[2rem] flex flex-col justify-between">
        <div>
          <Image
            src={carelife_logo}
            alt="Carelife Foundation"
            width={200}
            height={50}
          />
        </div>
        <div className="flex justify-center items-center">
          <div className="space-y-5">
            <div>
              <h1 className="text-[#0A0A0B] text-[32px] font-[700]">Welcome</h1>
              <p className="text-[#323F49] text-[16px] font-[400]">
                Good to have you back! Please enter your details.
              </p>
            </div>
            <LoginForm />
          </div>
        </div>
        <div className="text-[16px] font-[400] text-[#0A0A0B] flex items-center gap-2">
          <Image src={copyright} alt="" width={20} height={20} />
          2024 Carelife Foundation. All rights Reserved
        </div>
      </div>
      <div
        className="w-1/2 text-white flex items-end pb-10"
        style={{
          backgroundImage: `url('/login_bg.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
      >
        <div className="mx-[3rem] glass-effect border border-[#FFFFFF80] p-7">
          <p className="text-[30px] font-[600] mb-5">
            “We provide a place for children with special needs and mothers with
            health issues.”
          </p>
          <div className="pb-10 space-y-5">
            <p className="text-[36px] font-[600]">Faith Raymond</p>
            <p className="text-[18px] font-[600]">Operations Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
