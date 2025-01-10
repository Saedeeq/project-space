"use server";

import { Project, User } from "./models";
import { connectToDb } from "./utils";

export const getProjects = async () => {
  try {
    connectToDb();
    const projects = await Project.find().lean();
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw new Error("unable to fetch projects");
  }
};

export const getUsers = async () => {
  try {
    connectToDb();
    const users = await User.find().lean();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("unable to fetch users");
  }
};
