"use server";

import { Project, User } from "./models";
import { connectToDb } from "./utils";

export const getProjects = async () => {
  try {
    connectToDb();
    const projects = await Project.find();
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    // throw new Error("unable to fetch projects");
  }
};

export const getUsers = async () => {
  try {
    connectToDb();
    const users = await User.find();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("unable to fetch users");
  }
};

export const getSingleUser = async (matricNumber: string) => {
  try {
    connectToDb();
    const users = await User.findOne({ matricNumber });
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("unable to fetch users");
  }
};

export const getSingleProject = async (studentMatric: string) => {
  try {
    connectToDb();
    const project = await Project.findOne({ studentMatric });
    return project;
  } catch (error) {
    console.error("Error fetching project:", error);
    throw new Error("unable to find project");
  }
};
