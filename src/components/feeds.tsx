import React from "react";
import Link from "next/link";
import { projects, students } from "@/lib/data";

const Feeds = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8 h-96 overflow-auto">
      {projects.map((project) => {
        const student = students.find(
          (student) => student.matricNumber === project.matricNumber
        );
        return (
          <Link key={project.id} href={`/project/${project.matricNumber}`}>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
              <h2 className="text-2xl font-semibold mb-3 text-blue-600">
                {project.title}
              </h2>
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
          </Link>
        );
      })}
    </div>
  );
};

export default Feeds;
