const pokemonURL = 'https://pokeapi.co/api/v2/pokemon'
const pokeQueryParams = new URLSearchParams(window.location.search)
const pokemon_id = pokeQueryParams.get("pokemon_id")
const pokeDiv = document.querySelector('#poke-info')
fetch(`${pokemonURL}/${pokemon_id}`)
    .then(response => response.json())
    .then(pokemon => {
        displayPokemon(pokemon)
    })
    function displayPokemon(pokemon) {
        const pokemonName = document.createElement('h1');
        const pokemonPhoto = document.createElement('img');
        const pokemonType = document.createElement('p');
        const pokemonAbility = document.createElement('p');

        pokemonName.classList.add('pokename')
        pokemonName.textContent = `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`
        pokemonPhoto.src = `${pokemon.sprites.front_default}`
        pokemonPhoto.classList.add('poke-image')
        pokemonType.textContent = `Type: ${pokemon.types[0].type.name}`
        pokemonAbility.textContent = `Abilities: ${pokemon.abilities.map(ability => ability.ability.name).join(", ")}`
        pokeDiv.append(pokemonName, pokemonPhoto, pokemonType, pokemonAbility);
        }