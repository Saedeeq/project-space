"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface LoginCheckProps {
  children: React.ReactNode;
}

const LoginCheck: React.FC<LoginCheckProps> = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if the user is already logged in
    const storedMatricNumber = localStorage.getItem("matricNumber");
    const sessionToken = localStorage.getItem("sessionToken");
    const sessionExpiry = localStorage.getItem("sessionExpiry");

    // Validate session
    if (!storedMatricNumber || !sessionToken || !sessionExpiry) {
      router.push("/");
      return;
    }

    // Check if session is expired
    const expiryDate = new Date(sessionExpiry);
    if (new Date() > expiryDate) {
      // Session expired, clear storage and redirect
      localStorage.removeItem("matricNumber");
      localStorage.removeItem("sessionToken");
      localStorage.removeItem("sessionExpiry");
      router.push("/");
      return;
    }

    // Session is valid
    setIsAuthenticated(true);
  }, [router]);

  // Show nothing while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default LoginCheck;
