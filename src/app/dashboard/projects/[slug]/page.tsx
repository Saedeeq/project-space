import { getSingleProject, getSingleUser } from "@/lib/data";
import React from "react";

const SingleProjectPage = async ({ params }: { params: { slug: string } }) => {
  const project = await getSingleProject(params.slug);

  if (!project) {
    return <div>Project not found</div>;
  }

  const student = await getSingleUser(project.studentMatric);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Project Details
        </h1>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">
            Project Title
          </h2>
          <p className="text-gray-800">{project.title}</p>
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">Description</h2>
          <p className="text-gray-800">{project.description}</p>
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">Project Link</h2>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline">
            {project.link}
          </a>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <h2 className="text-2xl font-semibold text-gray-700">
            Student Details
          </h2>
          <p className="text-gray-600">
            <span className="font-medium">Student Matric:</span>{" "}
            {project.studentMatric}
          </p>
          {student && (
            <>
              <p className="text-gray-600">
                <span className="font-medium">Student Name:</span>{" "}
                {student.name}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Department:</span>{" "}
                {student.department}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProjectPage;
