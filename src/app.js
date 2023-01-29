const fetchPokemon = async () => {
  const getPokemonById = id => `https://pokeapi.co/api/v2/pokemon/${id}`
  const pokemonPromises = [];
  const pokemonNumbers = 151;
  let response;

  for (let i = 1; i <= pokemonNumbers; i++) {
    response = await fetch(getPokemonById(i));
    pokemonPromises.push(response.json());
  }
  let promise = await Promise.all(pokemonPromises);
  console.log(promise);
}

fetchPokemon();
