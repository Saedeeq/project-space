import React from "react";
import { projects, students } from "@/lib/data";

const Page = async ({ params }: { params: { matricNumber: string } }) => {
  const { matricNumber } = params;
  const project = projects.find(
    (project) => project.matricNumber === matricNumber
  );
  const student = students.find(
    (student) => student.matricNumber === matricNumber
  );

  if (!project) {
    return <div className="text-center text-red-500">Project not found</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-bold text-slate-600 mb-6 text-center">
          {project.title}
        </h1>
        <p className="text-gray-800 mb-4">{project.description}</p>
        {student && (
          <>
            <p className="text-gray-600 mt-2">
              Student: <span className="font-medium">{student.name}</span>
            </p>
            <p className="text-gray-600">
              Matric Number:{" "}
              <span className="font-medium">{student.matricNumber}</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
