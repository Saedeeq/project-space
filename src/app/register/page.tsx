"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/data";
import { createSession } from "@/lib/session";

interface FormErrors {
  name?: string;
  lastName?: string;
  matricNumber?: string;
  password?: string;
  confirmPassword?: string;
  department?: string;
}

interface Notification {
  type: "success" | "error";
  message: string;
}

const RegisterPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [notification, setNotification] = useState<Notification | null>(null);

  // Auto-dismiss notification after 5 seconds
  React.useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const name = (document.getElementById("name") as HTMLInputElement)?.value;
    if (!name || name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (name.length > 50) {
      newErrors.name = "Name cannot exceed 50 characters";
    }

    const lastName = (document.getElementById("lastName") as HTMLInputElement)?.value;
    if (!lastName || lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    } else if (lastName.length > 50) {
      newErrors.lastName = "Last name cannot exceed 50 characters";
    }

    const matricNumber = (document.getElementById("matricNumber") as HTMLInputElement)?.value;
    if (!matricNumber || matricNumber.length < 6) {
      newErrors.matricNumber = "Matric number must be at least 6 characters";
    } else if (matricNumber.length > 20) {
      newErrors.matricNumber = "Matric number cannot exceed 20 characters";
    }

    const password = (document.getElementById("password") as HTMLInputElement)?.value;
    if (!password || password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    const confirmPassword = (document.getElementById("confirmPassword") as HTMLInputElement)?.value;
    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    const department = (document.getElementById("department") as HTMLInputElement)?.value;
    if (!department || department.length < 2) {
      newErrors.department = "Department must be at least 2 characters";
    } else if (department.length > 100) {
      newErrors.department = "Department cannot exceed 100 characters";
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
      name: formData.get("name") as string,
      lastName: formData.get("lastName") as string,
      matricNumber: formData.get("matricNumber") as string,
      password: formData.get("password") as string,
      department: formData.get("department") as string,
    };

    try {
      const user = await registerUser(data);

      // Create session and log the user in
      const session = createSession(user._id, user.matricNumber);
      localStorage.setItem("matricNumber", user.matricNumber);
      localStorage.setItem("sessionToken", session.token);
      localStorage.setItem("sessionExpiry", session.expiresAt.toISOString());

      setNotification({ type: "success", message: "Registration successful! Redirecting..." });

      // Redirect after short delay
      setTimeout(() => {
        router.push("/dashboard/projects");
      }, 1500);
    } catch (error) {
      setNotification({
        type: "error",
        message: error instanceof Error ? error.message : "Registration failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg overflow-auto">
        <h1 className="text-3xl font-bold text-slate-600 mb-6 text-center">
          Create Account
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Register to start submitting and voting on projects
        </p>

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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-gray-700">
                First Name *
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="John"
                className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                required
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-gray-700">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Doe"
                className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.lastName
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                required
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="matricNumber" className="block text-gray-700">
              Matric Number *
            </label>
            <input
              type="text"
              name="matricNumber"
              id="matricNumber"
              placeholder="ABC123456"
              className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.matricNumber
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              required
            />
            {errors.matricNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.matricNumber}</p>
            )}
          </div>

          <div>
            <label htmlFor="department" className="block text-gray-700">
              Department *
            </label>
            <input
              type="text"
              name="department"
              id="department"
              placeholder="Computer Science"
              className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.department
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              required
            />
            {errors.department && (
              <p className="mt-1 text-sm text-red-600">{errors.department}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700">
              Password *
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Minimum 8 characters"
              className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              required
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700">
              Confirm Password *
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Re-enter password"
              className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.confirmPassword
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              required
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
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
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <a href="/" className="text-blue-500 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
