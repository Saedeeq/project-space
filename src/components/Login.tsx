"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/data";
import { createSession } from "@/lib/session";

const Login = () => {
  const [matricNumber, setMatricNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if the user is already logged in
    const storedMatricNumber = localStorage.getItem("matricNumber");
    const sessionToken = localStorage.getItem("sessionToken");
    const sessionExpiry = localStorage.getItem("sessionExpiry");

    if (storedMatricNumber && sessionToken && sessionExpiry) {
      // Check if session is still valid
      const expiryDate = new Date(sessionExpiry);
      if (new Date() <= expiryDate) {
        router.push("/dashboard/projects"); // Redirect if logged in
      } else {
        // Session expired, clear storage
        localStorage.removeItem("matricNumber");
        localStorage.removeItem("sessionToken");
        localStorage.removeItem("sessionExpiry");
      }
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const user = await loginUser(matricNumber, password);
      console.log("Login successful:", user);

      // Create session token
      const session = createSession(user._id, user.matricNumber);

      // Store session data in localStorage
      localStorage.setItem("matricNumber", matricNumber);
      localStorage.setItem("sessionToken", session.token);
      localStorage.setItem("sessionExpiry", session.expiresAt.toISOString());

      router.push("/dashboard/projects");
    } catch (error) {
      console.error("Login failed:", error);
      setError(error instanceof Error ? error.message : "Login failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/path/to/your/image.jpg')" }}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-bold text-slate-600 mb-6 text-center">
          Welcome to Project Space
        </h1>
        <h2 className="text-3xl font-bold text-slate-600 mb-6 text-center">
          Login
        </h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="matricNumber" className="block text-gray-700">
              Matric Number
            </label>
            <input
              type="text"
              name="matricNumber"
              id="matricNumber"
              value={matricNumber}
              onChange={(e) => {
                setMatricNumber(e.target.value);
                setError(null);
              }}
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
              name="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(null);
              }}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full p-2 rounded-lg transition-colors duration-300 ${
              loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
            } text-white`}
            disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don&apos;t have an account?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
