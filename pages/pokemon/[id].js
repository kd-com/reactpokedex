import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from '../../styles/PokemonDetail.module.css';

function PokemonDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      setPokemon(data);
    })();
  }, [id]);

  if (!pokemon) return <p>Chargement...</p>;

  return (
    <div className={styles.container}>
      <button onClick={() => router.back()}>← Retour</button>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
        alt={pokemon.name}
      />
      <h1>{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</h1>
      <p>Types : {pokemon.types.map(t => t.type.name).join(', ')}</p>
      <p>Taille : {pokemon.height / 10}m</p>
      <p>Poids : {pokemon.weight / 10}kg</p>
      <ul>
        {pokemon.stats.map((s, i) => (
          <li key={i}>{s.stat.name} : {s.base_stat}</li>
        ))}
      </ul>
    </div>
  );
}

export default PokemonDetail;