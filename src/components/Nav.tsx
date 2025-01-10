"use client";
import React, { useState } from "react";
import NavItem from "./NavItem";
import Search from "./Search";
import { UserIcon } from "@heroicons/react/20/solid";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className=" flex flex-row p-4 bg-gray-100 rounded-lg shadow-md items-center gap-3 w-4/5 m-auto sticky top-0 h-28 mt-2">
      <Search />
      <NavItem />
      <div className="relative">
        <UserIcon
          className="h-8 w-8 text-green-500 cursor-pointer"
          onClick={toggleMenu}
        />
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
            <a
              href="/profile"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
              Profile
            </a>
            <a
              href="/project/addproject"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
              Add Project
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
