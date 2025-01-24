"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const LoginCheck: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  useEffect(() => {
    // Check if the user is already logged in
    const storedMatricNumber = localStorage.getItem("matricNumber");
    if (!storedMatricNumber) {
      router.push("/"); // Redirect if not logged in
    }
  }, []);
  return <div>{children}</div>;
};

export default LoginCheck;
