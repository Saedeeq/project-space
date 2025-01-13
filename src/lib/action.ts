"use server";

import { IProject } from "./interface";
import { Project } from "./models";
import { connectToDb } from "./utils";

export const addProjects = async (data: IProject) => {
  console.log("Data before saving:", data);

  try {
    await connectToDb();
    const project = new Project(data);
    await project.save();
    console.log("Project saved:", project);
    return JSON.parse(JSON.stringify(project));
  } catch (error) {
    console.error("Error adding project:", error);
    throw new Error("Unable to add project");
  }
};
