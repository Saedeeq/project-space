import React from "react";
import { projects, students } from "@/lib/data";

const Page = async ({ params }: { params: { matricNumber: string } }) => {
  const { matricNumber } = params;
  const project = projects.find(
    (project) => project.studentMatric === matricNumber
  );
  const student = students.find(
    (student) => student.matricNumber === matricNumber
  );

  if (!project) {
    return <div className="text-center text-red-500">Project not found</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-slate-600 mb-6 text-center">
          {project.title}
        </h1>
        <p className="text-gray-800 mb-4">{project.description}</p>
        <div className="bg-gray-100 p-4 rounded-lg mt-4">
          {student && (
            <>
              <p className="text-gray-600 mt-2">
                <span className="font-medium">Student Name:</span>{" "}
                {student.name}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Matric Number:</span>{" "}
                {student.matricNumber}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Department:</span>{" "}
                {student.department}
              </p>
            </>
          )}
          <p className="text-gray-600 mt-2">
            <span className="font-medium">Project Link:</span>{" "}
            <a
              href={project.link}
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer">
              {project.link}
            </a>
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Date:</span> {project.date}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
