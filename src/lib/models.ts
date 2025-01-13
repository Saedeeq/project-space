import mongoose, { Document, Schema, Model } from "mongoose";
import { IProject, IUser } from "./interface";

const projectSchema = new Schema<IProject>({
  studentMatric: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  documentation: { type: String, required: true },
  votes: { type: Number },
  link: { type: String, required: false },
  date: { type: Date, required: false, default: Date.now },
});

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  matricNumber: { type: String, required: true },
  department: { type: String, required: true },
});

export const User =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export const Project =
  mongoose.models.Project || mongoose.model<IProject>("Project", projectSchema);
