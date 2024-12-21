import React from "react";
import NavItem from "./NavItem";
import Search from "./Search";

const Nav = () => {
  return (
    <div className="flex flex-row  p-4 bg-gray-100 rounded-lg shadow-md items-center gap-3 w-4/5 m-auto sticky top-0 h-28 mt-2">
      <Search />
      <NavItem />
    </div>
  );
};

export default Nav;
