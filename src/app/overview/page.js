import Layout from "@/components/Layout/Layout";
import Image from "next/image";
import React from "react";
import carelife_logo from "../../../public/carelife_new_logo.svg";
import copyright from "../../../public/copyright.svg";

const OverviewPage = () => {
  return (
    <Layout>
      <div>
        <div className="h-[80vh] flex justify-center items-center">
          <div className="opacity-[10%]">
            <Image src={carelife_logo} alt="" height={170} width={660} />
          </div>
        </div>
        <div className="flex gap-2 justify-end text-[16px] font-[400] text-[#0A0A0B]">
          <Image src={copyright} alt="" width={20} height={20} />
          <p>2024 Carelife Foundation. All rights Reserved</p>
        </div>
      </div>
    </Layout>
  );
};

export default OverviewPage;
