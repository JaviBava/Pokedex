const pokemonList = document.querySelector('.pokedex-list');
const pokemonDetails = document.querySelector('.pokedex-details');
const searchInput = document.querySelector('input[type=number]');
const searchButton = document.querySelector('button');

const baseUrl = 'https://pokeapi.co/api/v2';

// Función para obtener los detalles de un Pokémon
async function getPokemonDetails(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Función para mostrar los detalles de un Pokémon en la Pokédex
function showPokemonDetails(pokemon) {
  pokemonDetails.innerHTML = `
    <h2>${pokemon.name}</h2>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    <table>
      <tr>
        <th>Tipo:</th>
        <td>${pokemon.types.map(type => type.type.name).join(', ')}</td>
      </tr>
      <tr>
        <th>Altura:</th>
        <td>${pokemon.height / 10} m</td>
      </tr>
      <tr>
        <th>Peso:</th>
        <td>${pokemon.weight / 10} kg</td>
      </tr>
      <tr>
        <th>Habilidades:</th>
        <td>${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</td>
      </tr>
    </table>
  `;
}



// Función para mostrar la lista de Pokémon en la Pokédex
function showPokemonList(pokemonArray) {
  pokemonList.innerHTML = '';
  pokemonArray.forEach(pokemon => {
    const li = document.createElement('li');
    li.textContent = pokemon.name;
    li.addEventListener('click', async () => {
      const details = await getPokemonDetails(pokemon.url);
      showPokemonDetails(details);
    });
    pokemonList.appendChild(li);
  });
}

// Función para obtener la lista de Pokémon de la PokeAPI
async function getPokemonList(url = `${baseUrl}/pokemon`) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Mostrar la lista de Pokémon por primera vez
getPokemonList().then(data => {
  showPokemonList(data.results);
});

// Agregar evento al botón de búsqueda
searchButton.addEventListener('click', async () => {
  const searchQuery = searchInput.value.toLowerCase();
  if (searchQuery === '') {
    const data = await getPokemonList();
    showPokemonList(data.results);
  } else {
    const response = await fetch(`${baseUrl}/pokemon/${searchQuery}`);
    if (response.status === 404) {
      alert('Pokemon not found!');
      return;
    }
    const data = await response.json();
    showPokemonDetails(data);
  }
});


searchButton.addEventListener('click', searchPokemon);

function searchPokemon() {
    // Obtener el valor del input de búsqueda
    const pokemonNumber = searchInput.value;
  
    // Hacer una petición a la PokeAPI con el número del Pokémon
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`)
      .then(response => response.json())
      .then(data => {
        // Obtener la imagen del Pokémon de la respuesta de la API
        const imageUrl = data.sprites.front_default;
  
        // Mostrar la imagen en la interfaz de usuario
        pokemonImage.setAttribute('src', imageUrl);
      })
      .catch(error => {
        // Manejar el error si la petición falla
        console.log(error);
      });
  }

  
  const pokemonImage = document.querySelector('.pokemon-image');

 

searchButton.addEventListener('click', searchPokemon);

function searchPokemon() {
  const pokemonNumber = searchInput.value;

}


//controla que en el input se acepten solo numeros//

const numeroPokemon = document.querySelector('#numero-pokemon');

numeroPokemon.addEventListener('input', function() {
  this.value = this.value.replace(/[^0-9]/g, '');
});
