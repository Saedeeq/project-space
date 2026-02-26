"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Links from "./links";

const Navbar = () => {
  const [matricNumber, setMatricNumber] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedMatricNumber = localStorage.getItem("matricNumber");
    if (storedMatricNumber) {
      setMatricNumber(storedMatricNumber);
    }
  }, []);

  const handleLogout = () => {
    setLoading(true);
    // Clear all session data
    localStorage.removeItem("matricNumber");
    localStorage.removeItem("sessionToken");
    localStorage.removeItem("sessionExpiry");
    setTimeout(() => {
      router.push("/");
      setLoading(false);
    }, 500);
  };

  return (
    <div className="w-6/8 bg-green-300 flex justify-between p-2 sticky top-0 items-center">
      <div className="text-2xl font-bold text-green-700">ProjectSpace</div>
      <Links />
      <div className="flex items-center p-2">
        <h1 className="text-sm">Welcome: {matricNumber}</h1>
        <button
          className={`p-2 text-red-700 ${loading ? "bg-gray-500" : ""}`}
          onClick={handleLogout}
          disabled={loading}>
          {loading ? "Loading..." : "Logout"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
