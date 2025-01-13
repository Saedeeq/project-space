"use server";

import { Project } from "./models";
import { connectToDb } from "./utils";

export const addProjects = async (data: any) => {
  // const title = formData.get("title") as string;
  // const description = formData.get("description") as string;
  // const studentMatric = formData.get("studentMatric") as string;
  // const link = formData.get("link") as string;

  // const data = {
  //   title,
  //   description,
  //   studentMatric,
  //   link,
  // };

  console.log("Data before saving:", data);

  try {
    await connectToDb();
    const project = new Project(data);
    await project.save();
    console.log("Project saved:", project);
    return project;
  } catch (error) {
    console.error("Error adding project:", error);
  }
};
