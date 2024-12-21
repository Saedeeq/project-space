import { navData } from "@/lib/data";
import React from "react";

const NavItem = () => {
  return (
    <div className="flex space-x-4  ">
      {navData?.map((item) => (
        <a
          key={item.id}
          href={item.link}
          className="text-blue-500 hover:underline">
          {item.title}
        </a>
      ))}
    </div>
  );
};

export default NavItem;
