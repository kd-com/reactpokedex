import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import Pokemon from "./Pokemon";

function Home() {
  const [pokemonData, setPokemonData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [types, setTypes] = useState(["all"]);
  const [selectedType, setSelectedType] = useState("all");
  const pokemonUrl = "https://pokeapi.co/api/v2";
  const limit = 24;
  // charement des types
  useEffect(() => {
    (async () => {
      const response = await fetch(`${pokemonUrl}/type`);
      const data = await response.json();
      setTypes(["all", ...data.results.map((t) => t.name)]);
    })();
  }, []);
  // rechargement à chaque changement de type
  useEffect(() => {
    setOffset(0);
    setPokemonData([]);
    loadPokemons(0);
  }, [selectedType]);

  const loadPokemons = async (currentOffset) => {
    let poke = [];
    if (selectedType === "all") {
      const response = await fetch(
        `${pokemonUrl}/pokemon?limit=${limit}&offset=${currentOffset}`,
      );
      const data = await response.json();
      poke = await Promise.all(
        data.results.map((p) => fetch(p.url).then((res) => res.json())),
      );
    } else {
      const response = await fetch(`${pokemonUrl}/type/${selectedType}`);
      const data = await response.json();
      const slice = data.pokemon.slice(currentOffset, currentOffset + limit);
      poke = await Promise.all(
        slice.map((p) => fetch(p.pokemon.url).then((res) => res.json())),
      );
    }
    poke.sort(() => Math.random() - 0.5);
    setPokemonData((prev) => (currentOffset === 0 ? poke : [...prev, ...poke]));
  };
  const loadMorePokemons = () => {
    const newOffset = offset + limit;
    setOffset(newOffset);
    loadPokemons(newOffset);
  };
  const pokemon = pokemonData.map((data, i) => (
    <Pokemon
      key={i}
      id={data.id}
      name={data.name[0].toUpperCase() + data.name.slice(1)}
      typeName={data.types[0].type.name}
      img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`}
    />
  ));

  return (
    <div>
      <h1>POKEDEX</h1>
      <select
        className={styles.filterSelect}
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        {types.map((type) => (
          <option key={type} value={type}>
            {type[0].toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>
      <div className={styles.pokemonContainer}>{pokemon}</div>
      <button className={styles.next} onClick={loadMorePokemons}>
        Next
      </button>
    </div>
  );
}

export default Home;
