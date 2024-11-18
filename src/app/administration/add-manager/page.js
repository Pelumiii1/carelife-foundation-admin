import Layout from "@/components/Layout/Layout";
import React from "react";
import copyright from "../../../../public/copyright.svg";
import Image from "next/image";
import AddManagerForm from "@/components/AddManagerForm";

const AddManager = () => {
  return (
    <Layout>
      <div className="h-[80vh] flex flex-col items-center">
        <h1 className="text-[30px] font-[500] mb-3">Add New Manager</h1>
        <AddManagerForm />
      </div>
      <div className="flex gap-2 justify-end text-[16px] font-[400] text-[#0A0A0B]">
        <Image src={copyright} alt="" width={20} height={20} />
        <p>2024 Carelife Foundation. All rights Reserved</p>
      </div>
    </Layout>
  );
};

export default AddManager;
