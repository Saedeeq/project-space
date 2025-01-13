import React from "react";
import Link from "next/link";
import { IProject, IUser } from "@/lib/interface";
// export const projects = [
//   {
//     id: 1,
//     studentMatric: "MAT2024001",
//     title: "Student Enrollment",
//     description: "Details of student enrollment for 2024 intake",
//     link: "https://drive.google.com/example1",
//     date: "2025-01-06",
//   },
//   {
//     id: 2,
//     studentMatric: " ",
//     title: "Course Registration",
//     description: "List of registered courses for new students",
//     link: "https://drive.google.com/example2",
//     date: "2025-01-06",
//   },
//   {
//     id: 3,
//     studentMatric: "MAT2024003",
//     title: "Fee Payment Status",
//     description: "Overview of student fee payments and due balances",
//     link: "https://drive.google.com/example3",
//     date: "2025-01-06",
//   },
//   {
//     id: 4,
//     studentMatric: "MAT2024004",
//     title: "Orientation Schedule",
//     description: "Orientation program details and timetable",
//     link: "https://drive.google.com/example4",
//     date: "2025-01-06",
//   },
//   {
//     id: 5,
//     studentMatric: "MAT2024005",
//     title: "ID Card Issuance",
//     description: "Status of student ID card processing",
//     link: "https://drive.google.com/example5",
//     date: "2025-01-06",
//   },
//   {
//     id: 6,
//     studentMatric: "MAT2024006",
//     title: "Library Access",
//     description: "Details on student library access and privileges",
//     link: "https://drive.google.com/example6",
//     date: "2025-01-06",
//   },
//   {
//     id: 7,
//     studentMatric: "MAT2024007",
//     title: "Hostel Allocation",
//     description: "Information on student hostel assignments",
//     link: "https://drive.google.com/example7",
//     date: "2025-01-06",
//   },
//   {
//     id: 8,
//     studentMatric: "MAT2024008",
//     title: "Academic Calendar",
//     description: "Semester dates, exams, and breaks schedule",
//     link: "https://drive.google.com/example8",
//     date: "2025-01-06",
//   },
//   {
//     id: 9,
//     studentMatric: "MAT2024009",
//     title: "Health Insurance",
//     description: "Medical coverage details for students",
//     link: "https://drive.google.com/example9",
//     date: "2025-01-06",
//   },
//   {
//     id: 11,
//     studentMatric: "MAT2024011",
//     title: "Transport Services",
//     description: "Shuttle services and bus schedules for students",
//     link: "https://drive.google.com/example11",
//     date: "2025-08-06",
//   },
//   {
//     id: 12,
//     studentMatric: "MAT2024012",
//     title: "Graduation Requirements",
//     description: "Academic and non-academic graduation criteria",
//     link: "https://drive.google.com/example12",
//     date: "2025-01-06",
//   },
// ];
// export const students = [
//   {
//     id: 1,
//     name: "John ",
//     lastName: "Doe",
//     matricNumber: "MAT2024001",
//     department: "Computer Science",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     matricNumber: "MAT2024002",
//     department: "Information Technology",
//   },
//   {
//     id: 3,
//     name: "Alice Johnson",
//     matricNumber: "MAT2024003",
//     department: "Software Engineering",
//   },
//   {
//     id: 4,
//     name: "Bob Brown",
//     matricNumber: "MAT2024004",
//     department: "Cybersecurity",
//   },
//   {
//     id: 5,
//     name: "Charlie Davis",
//     matricNumber: "MAT2024005",
//     department: "Data Science",
//   },
//   {
//     id: 6,
//     name: "Diana Evans",
//     matricNumber: "MAT2024006",
//     department: "Artificial Intelligence",
//   },
//   {
//     id: 7,
//     name: "Ethan Harris",
//     matricNumber: "MAT2024007",
//     department: "Network Engineering",
//   },
//   {
//     id: 8,
//     name: "Fiona Green",
//     matricNumber: "MAT2024008",
//     department: "Computer Engineering",
//   },
//   {
//     id: 9,
//     name: "George Hill",
//     matricNumber: "MAT2024009",
//     department: "Electrical Engineering",
//   },
//   {
//     id: 10,
//     name: "Hannah King",
//     matricNumber: "MAT2024010",
//     department: "Mechanical Engineering",
//   },
//   {
//     id: 11,
//     name: "Ian Lee",
//     matricNumber: "MAT2024011",
//     department: "Business Information Systems",
//   },
//   {
//     id: 12,
//     name: "Jack Miller",
//     matricNumber: "MAT2024012",
//     department: "Finance and Technology",
//   },
// ];
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
