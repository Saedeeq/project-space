"use server";

import { IProject } from "./interface";
import { Project } from "./models";
import { connectToDb } from "./utils";

export const addProjects = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const studentMatric = formData.get("studentMatric") as string;
  const link = formData.get("link") as string;

  // const data: IProject = {
  //   title,
  //   description,
  //   studentMatric,
  //   link,
  // };

  try {
    await connectToDb();
    const project = new Project({ title, description, studentMatric, link });
    await project.save();
    return project;
  } catch (error) {
    console.error("Error adding project:", error);
    throw new Error("Unable to add project");
  }
};
