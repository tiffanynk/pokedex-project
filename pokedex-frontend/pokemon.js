const pokeDiv = document.querySelector('#poke-info')

const findPokemonDescription = document.querySelector(".description")

const pokemonSpeciesUrl = "https://pokeapi.co/api/v2/pokemon-species"
const pokemonURL = 'https://pokeapi.co/api/v2/pokemon'
const pokeQueryParams = new URLSearchParams(window.location.search)
const pokemon_id = pokeQueryParams.get("pokemon_id")

function fetchSpecies() {
    fetch(`${pokemonSpeciesUrl}/${pokemon_id}`)
    .then(response => response.json())
    .then(displayDetails)
}

fetch(`${pokemonURL}/${pokemon_id}`)
.then(response => response.json())
.then(displayPokemon)
.then(fetchSpecies)



        function displayPokemon(pokemon) {
            const largePokemonCard = document.createElement("div")
            largePokemonCard.classList.add("large-pokemon-card")
            largePokemonCard.id = `${pokemon.types[0].type.name}`

            const pokemonId = document.createElement("p")
            pokemonId.textContent = `#${pokemon.id}`
            pokemonId.classList.add("pokemon-id")

            const pokemonName = document.createElement('h1');
            pokemonName.classList.add('poke-name')
            pokemonName.textContent = `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`
            
            const pokemonPhoto = document.createElement('img');
            pokemonPhoto.src = `${pokemon.sprites.front_default}`
            pokemonPhoto.classList.add('poke-image')
            
            const pokemonType = document.createElement('p');
            pokemonType.textContent = `${pokemon.types[0].type.name.toUpperCase()}`
            pokemonType.classList.add("pokemon-type")
            
            const pokemonAbility = document.createElement('p');
            pokemonAbility.textContent = `Abilities: ${pokemon.abilities.map(ability => ability.ability.name).join(", ")}`
            pokemonAbility.classList.add("pokemon-abilities")

            pokeDiv.append(largePokemonCard)
            largePokemonCard.append(pokemonId, pokemonName, pokemonPhoto, pokemonType, pokemonAbility);
            }

    function displayDetails(pokemonDetails) {
        const pokemonCard = document.querySelector(".large-pokemon-card")
        console.log(pokemonCard)
        const pokemonDescription = document.createElement('p');
        pokemonDescription.classList.add("description")
        pokemonDescription.textContent = `${pokemonDetails.flavor_text_entries[3].flavor_text}`

        pokemonCard.append(pokemonDescription)
    }   