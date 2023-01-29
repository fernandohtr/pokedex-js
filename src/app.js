const fetchPokemon = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/7');
  const pokemonData = await response.json();
  console.log(pokemonData);
}

fetchPokemon();
