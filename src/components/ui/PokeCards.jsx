import React from "react";
import { Pokicard } from "./Pokicard";
import { useState, useEffect, useContext } from "react";
import { Context } from "./Context";
import { SearchBar } from "./SearchBar";
export function PokeCards() {
  const { fetchData, searchNames } = useContext(Context);
  const [pokeData, setPokeData] = useState(null);
  const { toggleShow, show } = useContext(Context);
  const [findObj, setFindObj] = useState("");
  useEffect(() => {
    if (searchNames) {
      const found = fetchData.find((elem) => elem.name === searchNames);
      setFindObj(found);
    }
  }, [searchNames]);
  return (
    <div className="flex flex-col items-center justify-center ">
      <SearchBar />
      {findObj ? (
        <div>
          <button
            onClick={() => setFindObj("")}
            className="bg-black h-10 w-38 ml-[4px] rounded-md text-white hover:text-black hover:bg-transparent transition-colors mb-4 -mt-4 hover:border-2"
          >
            Back
          </button>

          <Pokicard pokeName={findObj.name} pokeDataUrl={findObj.url} />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 bg-white sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {fetchData.map((elem, index) => (
            <div key={index}>
              <Pokicard pokeName={elem.name} pokeDataUrl={elem.url} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
