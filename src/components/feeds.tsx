import React from "react";
import Link from "next/link";
import { IProject, IUser } from "@/lib/interface";

interface FeedsProps {
  projects: IProject[];
  students: IUser[];
}
const Feeds: React.FC<FeedsProps> = ({ projects, students }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8 max-h-full overflow-scroll">
      {projects?.map((project: IProject) => {
        const student: IUser | undefined = students.find(
          (student: IUser) => student.matricNumber === project.studentMatric
        );
        return (
          <Link
            key={project.studentMatric}
            href={`/dashboard/projects/${project.studentMatric}`}>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer h-80 flex flex-col justify-between overflow-hidden">
              <div>
                <h2 className="text-2xl font-semibold mb-3 text-blue-600">
                  {project.title}
                </h2>
                <p className="text-gray-800 mb-4">{project.description}</p>
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
                            new Date(project.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
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
  );
};

export default Feeds;
