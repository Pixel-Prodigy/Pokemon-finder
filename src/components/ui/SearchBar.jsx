import React, { useContext, useState } from "react";
import { Context } from "./Context";

export function SearchBar() {
  const { fetchData, setSearchNames } = useContext(Context);
  const [search, setSearch] = useState("");
  const [value, setValue] = useState("");

  function findPokemon() {
    fetchData.map((elem) => {
      if (elem.name.toLowerCase() === search.toLowerCase()) {
        setSearchNames(search.toLowerCase());
      } else {
        console.log("Pokemon not found");
      }
    });
    setValue("");
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      findPokemon();
    }
  }

  return (
    <div className="flex flex-col items-center mb-6 justify-center h-24 gap-2 text-white">
      <input
        onChange={(e) => {
          setSearch(e.target.value);
          setValue(e.target.value);
        }}
        onKeyDown={handleKeyPress}
        type="text"
        value={value}
        placeholder="Search Pokemon"
        className="h-10 px-4 text-black border-2 rounded-md focus:outline-none w-80"
      />
      <button
        onClick={findPokemon}
        className="h-10 transition-colors duration-300 mt-3 bg-black rounded-md w-38 hover:border-2 active:scale-105 hover:bg-transparent hover:text-black"
      >
        Submit
      </button>
    </div>
  );
}
