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

export const updateProject = async (id: string, data: Partial<IProject>) => {
  try {
    await connectToDb();
    const updatedProject = await Project.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!updatedProject) {
      throw new Error("Project not found");
    }
    return JSON.parse(JSON.stringify(updatedProject));
  } catch (error) {
    console.error("Error updating project:", error);
    throw new Error("Unable to update project");
  }
};

export const deleteProject = async (id: string) => {
  try {
    await connectToDb();
    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) {
      throw new Error("Project not found");
    }
    return { success: true, message: "Project deleted successfully" };
  } catch (error) {
    console.error("Error deleting project:", error);
    throw new Error("Unable to delete project");
  }
};
