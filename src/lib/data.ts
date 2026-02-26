"use server";

import { unstable_noStore } from "next/cache";
import { Project, User } from "./models";
import { connectToDb } from "./utils";
import { IUser } from "./interface";
import bcrypt from "bcryptjs";

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

    // Find a user with the matching matricNumber
    const user = await User.findOne({ matricNumber }).lean();

    if (!user) {
      throw new Error("Invalid matric number or password");
    }

    // Verify the password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid matric number or password");
    }

    // Return user data without sensitive information
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw new Error("Unable to log in user");
  }
};

export const registerUser = async (userData: {
  name: string;
  lastName: string;
  matricNumber: string;
  password: string;
  department: string;
}) => {
  try {
    await connectToDb();

    // Check if user already exists
    const existingUser = await User.findOne({ matricNumber: userData.matricNumber });
    if (existingUser) {
      throw new Error("User with this matric number already exists");
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    // Create new user with hashed password
    const newUser = new User({
      ...userData,
      password: hashedPassword,
    });

    await newUser.save();

    // Return user data without password
    const userObject = newUser.toObject();
    const { password: _, ...userWithoutPassword } = userObject;
    return userWithoutPassword;
  } catch (error) {
    console.error("Error registering user:", error);
    throw new Error("Unable to register user");
  }
};

export const getSingleUser = async (matricNumber: string): Promise<IUser | null> => {
  try {
    await connectToDb();
    const user = await User.findOne({ matricNumber }).lean();
    return user as IUser | null;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Unable to fetch user");
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
