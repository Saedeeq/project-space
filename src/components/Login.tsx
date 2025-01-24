"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/data";
// Update the import path

const Login = () => {
  const [matricNumber, setMatricNumber] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check if the user is already logged in
    const storedMatricNumber = localStorage.getItem("matricNumber");
    if (storedMatricNumber) {
      router.push("/dashboard/projects"); // Redirect if logged in
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = await loginUser(matricNumber, password);
      console.log("Login successful:", user);

      // Save matric number to local storage
      localStorage.setItem("matricNumber", matricNumber);

      router.push("/dashboard/projects");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid matric number or password.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-bold text-slate-600 mb-6 text-center">
          Login To Your Project Space
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="matricNumber" className="block text-gray-700">
              Matric Number
            </label>
            <input
              type="text"
              id="matricNumber"
              value={matricNumber}
              onChange={(e) => setMatricNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
