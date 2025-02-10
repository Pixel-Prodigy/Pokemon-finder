import React, { useContext, useState, useEffect } from "react";
import { Context } from "./Context";

export function SearchBar() {
  const { setSearchNames } = useContext(Context);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!value.trim()) {
      setSearchNames(null);
    } else {
      setSearchNames(value.toLowerCase());
    }
  }, [value]);

  return (
    <div className="flex flex-col items-center mb-6 justify-center h-fit gap-2 text-white">
      <input
        onChange={(e) => setValue(e.target.value)}
        type="text"
        value={value}
        placeholder="Search Pokémon"
        className="h-12 px-4 border-black border-2 rounded-md focus:outline-none w-80"
      />
    </div>
  );
}
