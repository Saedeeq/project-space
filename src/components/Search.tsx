import React from "react";

const Search = () => {
  return (
    <form className="h-24 flex flex-1 items-center justify-center">
      <input
        type="text"
        name="search"
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search Projects ..."
      />
    </form>
  );
};

export default Search;
