import Navbar from "@/components/Navbar/Navbar";
import React from "react";
import LoginCheck from "./loginCheck";

const layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <LoginCheck>
      <div className="min-h-screen bg-gray-100">
        <Navbar />

        <main className="p-4">{children}</main>
      </div>
    </LoginCheck>
  );
};

export default layout;
