
async function fetchPokemon() {
  const pokemonsPromises = [];
  const pokemonNumbers = 151;
  let response;

  for (let i = 1; i <= pokemonNumbers; i++) {
    response = await fetch(getPokemonById(i));
    pokemonsPromises.push(response.json());
  }
  await Promise.all(pokemonsPromises)
    .then(pokemons => {

      const pokemonList = pokemons.reduce((element, pokemon) => {
        const types = pokemon.types.map(typeInfo => typeInfo.type.name);

        element += `
          <li class="card ${types[0]}">
            <img class="card-image" alt="${pokemon.name}" src="https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${zeroPadding(pokemon.id)}.png">
            <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
            <p class="card-subtitle">${types.join(' | ')}</p>
          </li>
        `;
        return element;
      }, '');
      const ul = document.querySelector('[data-js="pokedex"]');
      ul.innerHTML = pokemonList;
    });
};

function getPokemonById(id) {
  return `https://pokeapi.co/api/v2/pokemon/${id}`
}

function zeroPadding(number) {
  return String(number).padStart(3, '0');
}

fetchPokemon();
