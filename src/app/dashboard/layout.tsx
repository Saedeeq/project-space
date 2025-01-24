"use client";
import Navbar from "@/components/Navbar/Navbar";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  useEffect(() => {
    // Check if the user is already logged in
    const storedMatricNumber = localStorage.getItem("matricNumber");
    if (!storedMatricNumber) {
      router.push("/"); // Redirect if not logged in
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="p-4">{children}</main>
    </div>
  );
};

export default layout;
