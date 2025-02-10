import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";

export function Pokicard({ pokeName, pokeDataUrl }) {
  const [isLiked, setIsLiked] = useState(() => {
    return localStorage.getItem(pokeName) === "true";
  });
  const [show, setShow] = useState(false);
  const [pokeImage, setPokeImage] = useState("");
  const [pokeAbilities, setPokeAbilities] = useState(null);
  const [defaultFront, setDefaultFront] = useState(true);
  const [frontShiny, setFrontShiny] = useState(false);
  const [backShiny, setBackShiny] = useState(false);
  useEffect(() => {
    fetch(pokeDataUrl)
      .then((res) => res.json())
      .then((data) => setPokeImage(data.sprites.front_default))
      .catch((error) => console.error("Error fetching image:", error));
  }, [pokeDataUrl]);

  useEffect(() => {
    if (show) {
      fetch(pokeDataUrl)
        .then((res) => res.json())
        .then((data) => {
          setPokeAbilities({
            pokeHeight: data.height,
            pokeWeight: data.weight,
            pokePowers: data.abilities,
            pokeImg: data.sprites.front_default,
            pokeShiny: data.sprites.front_shiny,
            pokeBackShiny: data.sprites.back_shiny,
          });
          console.log(data);
        })
        .catch((error) => console.error("Error fetching details:", error));
    }
  }, [show, pokeDataUrl]);

  useEffect(() => {
    localStorage.setItem(pokeName, isLiked);
  }, [isLiked, pokeName]);
  function selectImg() {
    if (defaultFront) return pokeImage;
    else if (frontShiny) return pokeAbilities.pokeShiny;
    else if (backShiny) return pokeAbilities.pokeBackShiny;
  }
  return (
    <>
      {show && pokeAbilities && (
        <div
          className="bg-black/50 fixed top-0 left-0 z-10 flex items-center justify-center w-screen h-full"
          onClick={() => setShow(false)}
        >
          <div
            className="h-80 w-80 sm:w-110 relative flex flex-col items-center justify-center p-5 text-white bg-black border-4 border-white rounded-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex gap-6">
              <button
                onClick={() => {
                  setFrontShiny(false);
                  setBackShiny(false);
                  setDefaultFront(true);
                }}
                className="bg-white text-black px-5 rounded-sm py-[1px]  duration-300 hover:scale-115 transform transition-all hover:bg-black hover:border-1 hover:text-white cursor-pointer border-white"
              >
                Default
              </button>

              <button
                onClick={() => {
                  setFrontShiny(true);
                  setBackShiny(false);
                  setDefaultFront(false);
                }}
                className="bg-white text-black px-5 rounded-sm py-[1px]  duration-300 hover:scale-115 transform transition-all hover:bg-black hover:border-1 hover:text-white cursor-pointer border-white"
              >
                Front Shiny
              </button>
              <button
                onClick={() => {
                  setFrontShiny(false);
                  setBackShiny(true);
                  setDefaultFront(false);
                }}
                className="bg-white text-black px-5 rounded-sm py-[1px]  duration-300 hover:scale-115 transform transition-all hover:bg-black hover:border-1 hover:text-white cursor-pointer border-white"
              >
                Back Shiny
              </button>
            </div>
            <div className="flex items-center">
              <div className="py-7 flex flex-col items-center justify-between h-full">
                <h2 className="text-3xl font-bold text-red-500 underline">
                  {pokeName.toUpperCase()}
                </h2>
                <img className="h-40" src={selectImg()} alt={pokeName} />
              </div>

              <div className="sm:ml-5 flex flex-col">
                <h2 className="mb-3 text-2xl font-semibold text-orange-500 underline">
                  Pokémon Facts
                </h2>
                <p className="text-xl font-semibold">
                  Height: {pokeAbilities.pokeHeight}
                </p>
                <p className="text-xl font-semibold">
                  Weight: {pokeAbilities.pokeWeight}
                </p>
                <p className="text-xl font-semibold">
                  Abilities:{" "}
                  {pokeAbilities.pokePowers.map((ability, index) => (
                    <span key={index}> {ability.ability.name} </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className={`grid shadow-white/40  max-w-[200px] grid-cols-2 border-3 border-black rounded-md shadow-md hover:shadow-xl cursor-pointer py-2 px-2 h-56 transition-all ease-in-out duration-300 
        hover:scale-105 hover:underline hover:text-lg hover:text-blue-400 
        ${
          isLiked
            ? "bg-red-400 text-black"
            : "bg-black text-white hover:text-black hover:bg-transparent"
        }
        shadow-gray-400/60`}
        onClick={() => setShow(true)}
      >
        <div className="flex flex-col gap-4">
          <img className="min-w-40 h-40" src={pokeImage} alt={pokeName} />
          <p className="self-end">{pokeName}</p>
        </div>

        <span
          className="h-fit w-fit justify-self-end active:scale-110 transition-transform transform"
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked((prev) => !prev);
          }}
        >
          <FaHeart
            className={`text-3xl active:text-4xl transition-all ${
              isLiked ? "text-black" : "text-red-400"
            }`}
          />
        </span>
      </div>
    </>
  );
}
