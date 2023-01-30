async function fetchPokemon() {
  const pokemonNumbers = 151;
  const pokemonsPromises = generatePokemonPromises(pokemonNumbers);

  await Promise.all(pokemonsPromises)
    .then(generateHtml)
    .then(insertPokemonsIntoPage);
};

function generatePokemonPromises(pokemonNumbers) {
  return Array(pokemonNumbers).fill().map((_, i) =>
    fetch(getPokemonById(i + 1)).then(response => response.json()));
};

function generateHtml(pokemons) {
    return pokemons.reduce((element, { id, name, types }) => {
      const elementTypes = types.map(typeInfo => typeInfo.type.name);

      element += `
        <li class="card ${elementTypes[0]}">
          <img class="card-image" alt="${name}" src="https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${zeroPadding(id)}.png">
          <h2 class="card-title">${id}. ${name}</h2>
          <p class="card-subtitle">${elementTypes.join(' | ')}</p>
        </li>
      `;
      return element;
    }, '');
};

function insertPokemonsIntoPage(pokemons) {
  const ul = document.querySelector('[data-js="pokedex"]');
  ul.innerHTML = pokemons;
}

function getPokemonById(id) {
  return `https://pokeapi.co/api/v2/pokemon/${id}`
};

function zeroPadding(number) {
  return String(number).padStart(3, '0');
};

fetchPokemon();
