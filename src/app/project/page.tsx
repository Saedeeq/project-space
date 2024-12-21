import Feeds from "@/components/feeds";
import React from "react";
import BG from "../../public/bg.svg";

const page = () => {
  return (
    <div
      className="h-screen w-screen bg-slate-300 "
      style={{
        backgroundImage: `url(${BG.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
      <Feeds />
    </div>
  );
};

export default page;
