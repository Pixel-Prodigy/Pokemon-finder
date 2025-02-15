import { useEffect, useState } from "react";
import "./App.css";
import { Pokicard } from "./components/ui/Pokicard";
import { PokeCards } from "./components/ui/PokeCards";
import { ContextProvider } from "./components/ui/ContextProvider";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then((res) => res.json())
      .then((data) => {
        setData(data?.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ContextProvider fetchData={data}>
      <div className="flex flex-col items-center h-full   justify-center p-10 py-20 ">
        <h2 className="text-3xl text-center text-white font-semibold">
          Find facts about yours favorite Pokemon
        </h2>
        <h3 className="text-lg text-gray-400 mb-8">
          Make sure to type name correctly{" "}
        </h3>
        <PokeCards />
      </div>
    </ContextProvider>
  );
}

export default App; 