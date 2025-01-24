"use server";

import { unstable_noStore } from "next/cache";
import { Project, User } from "./models";
import { connectToDb } from "./utils";

export const getProjects = async () => {
  unstable_noStore();
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

export const loginUser = async (matricNumber: string, password: string) => {
  try {
    // Connect to the database
    await connectToDb();

    // Find a user with the matching matricNumber and password
    const user = await User.findOne({ matricNumber, password }).lean();

    if (!user) {
      throw new Error("Invalid matric number or password");
    }

    // If the user is found, return the user data (excluding sensitive info, if needed)
    return user;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw new Error("Unable to log in user");
  }
};

export const getSingleUser = async (matricNumber: string) => {
  try {
    connectToDb();
    const users = await User.findOne({ matricNumber }).lean();
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
