"use client";
import React, { useEffect, useState } from "react";
import Links from "./links";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [matricNumber, setMatricNumber] = useState("");
  useEffect(() => {
    const storedMatricNumber = localStorage.getItem("matricNumber");
    if (storedMatricNumber) {
      setMatricNumber(storedMatricNumber);
    }
  }, []);
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("matricNumber");
    router.push("/");
  };
  return (
    <div className="w-6/8 bg-green-300 flex justify-between p-2 sticky top-0 items-center">
      <div className="text-2xl font-bold text-green-700">ProjectSpace</div>{" "}
      <Links />
      <div className="flex items-center p-2">
        <h1 className="text-sm">welcome:{matricNumber}</h1>
        <button className="p-2 text-red-700 " onClick={handleLogout}>
          Logout{" "}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
