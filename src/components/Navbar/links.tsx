"use client";
import Link from "next/link";
import React, { useState } from "react";

const Links = () => {
  const [addproject, setAddProject] = useState(false);
  const links = [
    { title: "Projects", path: "/dashboard/projects" },
    { title: "Profile", path: "/dashboard/profile" },
    { title: "Add Project", path: "/dashboard/addproject" },
  ];
  return (
    <div className="w-64 flex gap-4  items-center">
      {links.map((link) => (
        <Link key={link.path} href={link.path}>
          {link.title}
        </Link>
      ))}
    </div>
  );
};

export default Links;
