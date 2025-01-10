import React, { useState } from "react";
import { addProjects } from "@/lib/action";
import { IProject } from "@/lib/interface";

const AddProject = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg overflow-auto">
        <h1 className="text-3xl font-bold text-slate-600 mb-6 text-center">
          Add Project
        </h1>
        <form action={addProjects} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="link" className="block text-gray-700">
              Link
            </label>
            <input
              type="url"
              name="link"
              id="link"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="studentMatric" className="block text-gray-700">
              Student Matric
            </label>
            <input
              type="text"
              name="studentMatric"
              id="studentMatric"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
            Add Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
