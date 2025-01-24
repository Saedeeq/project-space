"use client";
import React, { useState } from "react";
import Link from "next/link";
import { IProject, IUser } from "@/lib/interface";

interface FeedsProps {
  projects: IProject[];
  students: IUser[];
}

const Feeds: React.FC<FeedsProps> = ({ projects, students }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartment(e.target.value);
  };

  const filteredProjects = projects.filter((project) => {
    const student = students.find(
      (student) => student.matricNumber === project.studentMatric
    );

    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm) ||
      project.studentMatric.toLowerCase().includes(searchTerm);

    const matchesDepartment =
      selectedDepartment === "" ||
      (student && student.department === selectedDepartment);

    return matchesSearch && matchesDepartment;
  });

  const uniqueDepartments = Array.from(
    new Set(students.map((student) => student.department))
  );

  return (
    <div className="p-8 max-h-full overflow-scroll">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by project title or matric number"
          className="p-3 border rounded-lg w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={searchTerm}
          onChange={handleSearch}
        />
        <select
          className="p-3 border rounded-lg w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={selectedDepartment}
          onChange={handleFilter}>
          <option value="">All Departments</option>
          {uniqueDepartments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center text-gray-600 mt-4 ">No projects found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const student = students.find(
              (student) => student.matricNumber === project.studentMatric
            );
            return (
              <Link
                key={project.studentMatric}
                href={`/dashboard/projects/${project.studentMatric}`}>
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer h-80 flex flex-col justify-between overflow-hidden border border-gray-200 hover:border-blue-500">
                  <div>
                    <h2 className="text-2xl font-semibold mb-3 text-blue-600">
                      {project.title}
                    </h2>
                    <p className="text-gray-800 mb-4 line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                  {student && (
                    <div className="bg-gray-100 p-4 rounded-lg mt-4">
                      <div className="flex flex-col space-y-2">
                        <div>
                          <p className="text-gray-600">
                            Student:{" "}
                            <span className="font-medium">{student.name}</span>
                          </p>
                          <p className="text-gray-600">
                            Matric Number:{" "}
                            <span className="font-medium">
                              {student.matricNumber}
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">
                            Dept:{" "}
                            <span className="font-medium">
                              {student.department}
                            </span>
                          </p>
                          <p className="text-gray-600">
                            Date:{" "}
                            <span className="font-medium">
                              {project.date &&
                                new Date(project.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Feeds;
