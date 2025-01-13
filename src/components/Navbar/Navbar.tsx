import React from "react";
import Links from "./links";

const Navbar = () => {
  return (
    <div className="w-6/8 bg-green-300 flex justify-between p-2 sticky top-0">
      <div className="text-2xl font-bold text-green-700">ProjectSpace</div>{" "}
      <Links />
    </div>
  );
};

export default Navbar;
