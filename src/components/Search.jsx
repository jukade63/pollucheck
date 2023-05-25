import React, { useState } from "react";

function Search({ setSearch, handleSearch }) {
  return (
    <form className="mt-5 text-center mb-5" onSubmit={handleSearch}>
      <input
        className="shadow border border-gray-300 rounded 
        py-2 px-3 text-gray-800 focus:outline-none border-2 focus:border-purple-500"
        type="text"
        placeholder="City name"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
        type="submit"
      >
        Search
      </button>
    </form>
  );
}

export default Search;
