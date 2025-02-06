import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
export function Pokicard({ pokeName, pokeDataUrl, ...props }) {
  const [isLiked, setIsLiked] = useState(() => {
    const saved = localStorage.getItem(pokeName);
    return saved === "true";
  });
  const [show, setShow] = useState(false);
  const [pokeAbilities, setPokeAbilities] = useState({
    pokeHeight: "",
    pokeWeight: "",
    pokePowers: [],
  });

  useEffect(() => {
    if (show) {
      fetch(pokeDataUrl)
        .then((res) => res.json())
        .then((data) => {
          setPokeAbilities({
            pokeHeight: data.height,
            pokeWeight: data.weight,
            pokePowers: data.abilities,
          });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [show, pokeDataUrl]);

  useEffect(() => {
    localStorage.setItem(pokeName, isLiked);
  }, [isLiked]);

  return (
    <>
      {show && (
        <div
          className="fixed top-0 left-0 z-10 w-screen h-full bg-black/50"
          onClick={() => setShow(false)}
        >
          <div
            className="absolute  z-20 flex flex-col border-4  border-white bg items-center justify-center w-80 h-80 p-3 transform rounded-md -translate-x-1/2 -translate-y-1/2 bg-black text-white  top-1/2 left-1/2"
            style={{
              backgroundImage:
                "url('https://w0.peakpx.com/wallpaper/569/169/HD-wallpaper-spots-dots-black-and-white-black-thumbnail.jpg')",
            }}
          >
            <h2 className="text-4xl underline text-red-500 font-bold -mt-6 mb-4">
              {pokeName.toUpperCase()}
            </h2>
            <h2 className="text-2xl mb-3 font-semibold">Pokémon Facts</h2>
            <p className="font-semibold text-xl mb-2">
              Height: {pokeAbilities.pokeHeight}
            </p>
            <p className="font-semibold text-xl mb-2">
              {" "}
              Weight: {pokeAbilities.pokeWeight}
            </p>
            <p className="font-semibold text-xl mb-2">
              Abilities:{" "}
              {pokeAbilities.pokePowers.map((ability, index) => (
                <span key={index}>{ability.ability.name}</span>
              ))}
            </p>
          </div>
        </div>
      )}
      <div
        className={`grid max-w-[200px]  grid-cols-2  border-2 border-black rounded-md shadow-sm cursor-pointer py-2 px-2 h-56 transition-all ease-in-out duration-300 
    hover:scale-105 hover:underline hover:text-2xl  
    ${
      isLiked
        ? "bg-white text-black "
        : "bg-black hover:text-black hover:bg-transparent text-white "
    } 
    shadow-gray-400/60`}
        onClick={() => setShow(true)}
      >
        <p
          className={`self-end pl-2 transition-colors duration-300
          }`}
        >
          {pokeName}
        </p>

        <span
          className="transition-transform transform h-fit w-fit justify-self-end active:scale-110"
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked((prevState) => !prevState);
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
