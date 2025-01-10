import Feeds from "@/components/feeds";
import React from "react";
import BG from "../../public/bg.svg";
import { connectToDb } from "@/lib/utils";
import { getProjects, getUsers } from "@/lib/data";

const page = async () => {
  const projects = await getProjects();
  const users = await getUsers();

  return (
    <div
      className="h-screen w-screen bg-slate-300 "
      style={{
        backgroundImage: `url(${BG.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
      <Feeds projects={projects} students={users} />
    </div>
  );
};

export default page;
