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

        {/* PDF Document Download */}
        {project.pdfDocument && project.pdfFileName && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              Project Document
            </h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <svg className="w-10 h-10 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-medium text-gray-900">{project.pdfFileName}</p>
                  <p className="text-sm text-gray-500">PDF Document</p>
                </div>
              </div>
              <a
                href={`/api/download?file=${encodeURIComponent(project.pdfDocument.replace("/uploads/", ""))}`}
                download={project.pdfFileName}
                className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M5 2.985V16a1 1 0 001 1h8a1 1 0 001-1V2.985a1 1 0 00-.293-.707l-3-3a1 1 0 00-.707-.293H6a1 1 0 00-.707.293l-3 3a1 1 0 00-.293.707z" clipRule="evenodd" />
                </svg>
                <span>Download</span>
              </a>
            </div>
          </div>
        )}

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
                {student?.name}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Department:</span>{" "}
                {student?.department}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProjectPage;
