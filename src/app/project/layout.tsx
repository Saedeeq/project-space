import Nav from "@/components/Nav";
import React from "react";
interface layoutProps {
  children?: React.ReactNode;
}
const layout = ({ children }: layoutProps) => {
  return (
    <div className="h-screen w-screen bg-slate-300 overflow-y-hidden">
      <h1 className="text-4xl font-semibold text-slate-600 text-center">
        Project Space
      </h1>
      <Nav />
      {children}
    </div>
  );
};

export default layout;
