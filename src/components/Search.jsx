import React, { useState } from "react";

function Search({ onInputChange, search, handleSearch }) {
  return (
    <form className="text-center mb-5" onSubmit={handleSearch}>
      <input
        className="shadow border border-gray-300 rounded  bg-gray-100 focus:bg-white
        py-2 px-3 text-gray-800 focus:outline-none border-2 focus:border-sky-500"
        type="text"
        placeholder="City"
        onChange={onInputChange}
        value={search}
      />
      <button
        className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded ml-2"
        type="submit"
      >
        Search
      </button>
    </form>
  );
}

export default Search;
