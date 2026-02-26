"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { IProject, IUser } from "@/lib/interface";

interface FeedsProps {
  projects: IProject[];
  students: IUser[];
}

const Feeds: React.FC<FeedsProps> = ({ projects, students }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "title">("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Extract unique departments
  const uniqueDepartments = useMemo(
    () => Array.from(new Set(students.map((s) => s.department))),
    [students]
  );

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    const filtered = projects.filter((project) => {
      const student = students.find(
        (s) => s.matricNumber === project.studentMatric
      );

      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.studentMatric.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDepartment =
        selectedDepartment === "" ||
        (student && student.department === selectedDepartment);

      return matchesSearch && matchesDepartment;
    });

    // Sort projects
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime();
        case "oldest":
          return new Date(a.date || 0).getTime() - new Date(b.date || 0).getTime();
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [projects, students, searchTerm, selectedDepartment, sortBy]);

  // Get student by matric number
  const getStudent = (matricNumber: string) =>
    students.find((s) => s.matricNumber === matricNumber);

  // Stats
  const stats = {
    total: projects.length,
    filtered: filteredProjects.length,
    withPdf: projects.filter((p) => p.pdfDocument).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Student Projects
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Discover innovative projects from our talented students
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4 mt-8 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-3xl font-bold">{stats.total}</p>
              <p className="text-sm text-blue-100">Total Projects</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-3xl font-bold">{stats.filtered}</p>
              <p className="text-sm text-blue-100">Showing</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-3xl font-bold">{stats.withPdf}</p>
              <p className="text-sm text-blue-100">With Documents</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-8">
        {/* Filters Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search projects by title, description, or matric number..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Department Filter */}
            <div className="w-full lg:w-48">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <select
                  className="w-full pl-12 pr-8 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white cursor-pointer transition-all duration-200"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option value="">All Departments</option>
                  {uniqueDepartments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="w-full lg:w-48">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                    />
                  </svg>
                </div>
                <select
                  className="w-full pl-12 pr-8 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white cursor-pointer transition-all duration-200"
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as "newest" | "oldest" | "title")
                  }
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="title">By Title</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex border border-gray-300 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-4 py-3 transition-all duration-200 ${
                  viewMode === "grid"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-4 py-3 transition-all duration-200 ${
                  viewMode === "list"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {filteredProjects.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900">
                {projects.length}
              </span>{" "}
              projects
            </p>
            {(searchTerm || selectedDepartment) && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedDepartment("");
                }}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Clear filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid/List */}
        {filteredProjects.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-4 text-xl font-semibold text-gray-900">
              No projects found
            </h3>
            <p className="mt-2 text-gray-600">
              Try adjusting your search or filters to find what you&apos;re looking for.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedDepartment("");
              }}
              className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {filteredProjects.map((project) => {
              const student = getStudent(project.studentMatric);
              return (
                <Link
                  key={project.studentMatric}
                  href={`/dashboard/projects/${project.studentMatric}`}
                >
                  <div
                    className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-500 ${
                      viewMode === "list" ? "flex" : ""
                    }`}
                  >
                    {/* Card Header with Gradient */}
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white line-clamp-1 group-hover:text-blue-100 transition-colors">
                          {project.title}
                        </h2>
                        {project.pdfDocument && (
                          <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                            <svg
                              className="w-4 h-4 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 flex-1">
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {project.description}
                      </p>

                      {/* Student Info */}
                      {student && (
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl">
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <svg
                                className="w-5 h-5 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-gray-900 truncate">
                                {student.name}
                              </p>
                              <p className="text-sm text-gray-600 truncate">
                                {student.matricNumber}
                              </p>
                              <div className="flex items-center space-x-2 mt-2">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  {student.department}
                                </span>
                                {project.date && (
                                  <span className="text-xs text-gray-500">
                                    {new Date(project.date).toLocaleDateString(
                                      "en-US",
                                      {
                                        year: "numeric",
                                        month: "short",
                                      }
                                    )}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Card Footer */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Click to view details</span>
                        <svg
                          className="w-5 h-5 text-blue-500 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feeds;
