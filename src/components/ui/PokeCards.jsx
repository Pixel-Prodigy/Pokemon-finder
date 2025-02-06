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
  const [nothingFound, setNothingFound] = useState(false);
 
  console.log(searchNames)
  useEffect(() => {
    if (searchNames) {
      if (searchNames === "pokemon not found") {
        setNothingFound(true);
      } else {
        const found = fetchData.find((elem) => elem.name === searchNames);
        setFindObj(found);
      }
    }
  }, [searchNames]);
  if (nothingFound) {
    return (
      <div className="flex flex-col items-center justify-center ">
        <SearchBar />

        <div className="grid">
          <h3 className="text-4xl">No Pokemon found :{"("}</h3>
          <button
            onClick={() => setNothingFound(false)}
            className=" justify-self-center bg-black h-10 w-56 mt-4  rounded-md text-white hover:text-black hover:bg-transparent transition-colors  hover:border-2"
          >
            Back
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center ">
      <SearchBar />
      {findObj ? (
        <div>
          <Pokicard pokeName={findObj.name} pokeDataUrl={findObj.url} />
          <button
            onClick={() => setFindObj("")}
            className="bg-black h-10 w-full mt-4  rounded-md text-white hover:text-black hover:bg-transparent transition-colors  hover:border-2"
          >
            Back
          </button>
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
