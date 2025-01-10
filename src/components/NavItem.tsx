import React from "react";
export const navData = [
  { id: 1, title: "About", link: "/about" },
  { id: 2, title: "Contact", link: "/contact" },
  { id: 3, title: "Documentation", link: "/documentation" },
];
const NavItem = () => {
  return (
    <div className="space-x-4 hidden md:flex ">
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
