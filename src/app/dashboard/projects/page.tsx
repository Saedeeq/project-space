import Feeds from "@/components/feeds";
import { getProjects, getUsers } from "@/lib/data";
import React from "react";

const ProjectsPage = async () => {
  const projects = await getProjects();
  const students = await getUsers();
  return (
    <div>
      <Feeds projects={projects} students={students} />
    </div>
  );
};

export default ProjectsPage;
