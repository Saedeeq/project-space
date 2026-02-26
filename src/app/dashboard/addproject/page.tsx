"use client";
import { addProjects } from "@/lib/action";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSingleUser } from "@/lib/data";
import { IUser } from "@/lib/interface";

interface FormErrors {
  title?: string;
  description?: string;
  link?: string;
  documentation?: string;
  studentMatric?: string;
}

interface Notification {
  type: "success" | "error";
  message: string;
}

const AddProjectPage = () => {
  const router = useRouter();

  const [student, setStudent] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [notification, setNotification] = useState<Notification | null>(null);

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

  // Auto-dismiss notification after 5 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Title validation (3-150 characters)
    const title = (document.getElementById("title") as HTMLInputElement)?.value;
    if (!title || title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    } else if (title.length > 150) {
      newErrors.title = "Title cannot exceed 150 characters";
    }

    // Description validation (10-1000 characters)
    const description = (document.getElementById("description") as HTMLTextAreaElement)?.value;
    if (!description || description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    } else if (description.length > 1000) {
      newErrors.description = "Description cannot exceed 1000 characters";
    }

    // Link validation (optional, but if provided must be valid URL)
    const link = (document.getElementById("link") as HTMLInputElement)?.value;
    if (link && link.length > 500) {
      newErrors.link = "Link cannot exceed 500 characters";
    }

    // Documentation validation
    const documentation = (document.getElementById("documentation") as HTMLInputElement)?.value;
    if (!documentation || documentation.trim().length === 0) {
      newErrors.documentation = "Documentation is required";
    }

    // Student Matric validation
    const studentMatric = (document.getElementById("studentMatric") as HTMLInputElement)?.value;
    if (!studentMatric || studentMatric.length < 6) {
      newErrors.studentMatric = "Matric number must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setNotification({ type: "error", message: "Please fix the form errors" });
      return;
    }

    setLoading(true);
    setNotification(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      link: formData.get("link") as string,
      documentation: formData.get("documentation") as string,
      studentMatric: formData.get("studentMatric") as string,
    };

    try {
      await addProjects(data);
      setNotification({ type: "success", message: "Project added successfully!" });
      
      // Redirect after short delay
      setTimeout(() => {
        router.push(`/dashboard/projects/${data.studentMatric}`);
      }, 1000);
    } catch (error) {
      setNotification({ 
        type: "error", 
        message: error instanceof Error ? error.message : "Failed to add project" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg overflow-auto">
        <h1 className="text-3xl font-bold text-slate-600 mb-6 text-center">
          Add Project
        </h1>
        
        {/* Notification */}
        {notification && (
          <div className={`mb-4 p-3 rounded-lg ${
            notification.type === "success" 
              ? "bg-green-100 border border-green-400 text-green-700" 
              : "bg-red-100 border border-red-400 text-red-700"
          }`}>
            {notification.message}
          </div>
        )}

        <form onSubmit={handleSubmit} method="post" className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.title 
                  ? "border-red-500 focus:ring-red-500" 
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              required
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.description 
                  ? "border-red-500 focus:ring-red-500" 
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              required
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          <div>
            <label htmlFor="link" className="block text-gray-700">
              Link (Optional)
            </label>
            <input
              type="url"
              name="link"
              id="link"
              placeholder="https://github.com/user/project"
              className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.link 
                  ? "border-red-500 focus:ring-red-500" 
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.link && (
              <p className="mt-1 text-sm text-red-600">{errors.link}</p>
            )}
          </div>

          <div>
            <label htmlFor="documentation" className="block text-gray-700">
              Documentation
            </label>
            <input
              type="text"
              name="documentation"
              id="documentation"
              placeholder="Project documentation or README link"
              className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.documentation 
                  ? "border-red-500 focus:ring-red-500" 
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              required
            />
            {errors.documentation && (
              <p className="mt-1 text-sm text-red-600">{errors.documentation}</p>
            )}
          </div>

          <div>
            <label htmlFor="studentMatric" className="block text-gray-700">
              Student Matric
            </label>
            <input
              type="text"
              name="studentMatric"
              id="studentMatric"
              value={student?.matricNumber || ""}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
              required
            />
            {errors.studentMatric && (
              <p className="mt-1 text-sm text-red-600">{errors.studentMatric}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white p-2 rounded-lg transition-colors duration-300 ${
              loading 
                ? "bg-gray-500 cursor-not-allowed" 
                : "bg-blue-500 hover:bg-blue-600"
            }`}>
            {loading ? "Adding..." : "Add Project"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProjectPage;
