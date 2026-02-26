import mongoose, { Schema, Document } from "mongoose";
import { IProject, IUser } from "./interface";

// Extend interfaces for Mongoose documents
export interface IProjectDocument extends IProject, Document {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDocument extends IUser, Document {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProjectDocument>(
  {
    studentMatric: {
      type: String,
      required: [true, "Student matric number is required"],
      trim: true,
      minlength: [6, "Matric number must be at least 6 characters"],
      maxlength: [20, "Matric number cannot exceed 20 characters"],
    },
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [150, "Title cannot exceed 150 characters"],
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    documentation: {
      type: String,
      required: [true, "Project documentation is required"],
      trim: true,
    },
    votes: {
      type: Number,
      default: 0,
      min: [0, "Votes cannot be negative"],
    },
    link: {
      type: String,
      required: false,
      trim: true,
      maxlength: [500, "Link cannot exceed 500 characters"],
    },
    date: {
      type: Date,
      required: false,
      default: Date.now,
    },
    pdfDocument: {
      type: String,
      required: false,
      trim: true,
    },
    pdfFileName: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for frequently queried fields
projectSchema.index({ studentMatric: 1 });
projectSchema.index({ date: -1 });
projectSchema.index({ votes: -1 });

const userSchema = new Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: [2, "Last name must be at least 2 characters"],
      maxlength: [50, "Last name cannot exceed 50 characters"],
    },
    matricNumber: {
      type: String,
      required: [true, "Matric number is required"],
      trim: true,
      minlength: [6, "Matric number must be at least 6 characters"],
      maxlength: [20, "Matric number cannot exceed 20 characters"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
      minlength: [2, "Department must be at least 2 characters"],
      maxlength: [100, "Department cannot exceed 100 characters"],
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for frequently queried fields (matricNumber already has unique: true)
userSchema.index({ name: 1 });

export const User =
  mongoose.models.User || mongoose.model<IUserDocument>("User", userSchema);

export const Project =
  mongoose.models.Project ||
  mongoose.model<IProjectDocument>("Project", projectSchema);
