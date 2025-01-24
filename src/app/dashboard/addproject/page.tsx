"use client";
import { addProjects } from "@/lib/action";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSingleUser } from "@/lib/data";

const AddProjectPage = () => {
  const router = useRouter();
  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    const fetchStudent = async () => {
      const matricNumber = localStorage.getItem("matricNumber");
      if (matricNumber) {
        const studentData = await getSingleUser(matricNumber);
        setStudent(studentData);
      }
    };
    fetchStudent();
  }, []);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      link: formData.get("link") as string,
      documentation: formData.get("documentation") as string,
      studentMatric: formData.get("studentMatric") as string,
    };
    console.log("Form data:", data);
    const result = await addProjects(data);
    console.log("Result:", result);

    // Redirect to the project page
    router.push(`/dashboard/projects/${data.studentMatric}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg overflow-auto">
        <h1 className="text-3xl font-bold text-slate-600 mb-6 text-center">
          Add Project
        </h1>
        <form onSubmit={handleSubmit} method="post" className="space-y-4">
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
            <label htmlFor="documentation" className="block text-gray-700">
              Documentation
            </label>
            <input
              type="text"
              name="documentation"
              id="documentation"
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
              value={student?.matricNumber}
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

export default AddProjectPage;
