import React, { useState, useEffect, useContext } from "react";
import { Pokicard } from "./Pokicard";
import { Context } from "./Context";
import { SearchBar } from "./SearchBar";

export function PokeCards() {
  const { fetchData, searchNames, setSearchNames } = useContext(Context);
  const [nothingFound, setNothingFound] = useState(false);

  useEffect(() => {
    if (searchNames) {
      const found = fetchData.some((elem) =>
        elem.name.toLowerCase().includes(searchNames.toLowerCase())
      );
      setNothingFound(!found);
    } else {
      setNothingFound(false);
    }
  }, [searchNames, fetchData]);

  const filteredData = searchNames
    ? fetchData.filter((elem) =>
        elem.name.toLowerCase().includes(searchNames.toLowerCase())
      )
    : fetchData;

  return (
    <div className="flex flex-col items-center justify-center">
      <SearchBar />
      {nothingFound ? (
        <div className="grid text-center">
          <h3 className="text-4xl">No Pokémon found :(</h3>
          <button
            onClick={() => {setNothingFound(false); setSearchNames("")}}
            className="justify-self-center bg-black h-10 w-56 mt-4 rounded-md text-white hover:text-black hover:bg-transparent transition-colors hover:border-2"
          >
            Back
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 bg-white sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filteredData.map((elem, index) => (
            <Pokicard key={index} pokeName={elem.name} pokeDataUrl={elem.url} />
          ))}
        </div>
      )}
    </div>
  );
}
