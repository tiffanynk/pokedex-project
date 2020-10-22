const pokeDiv = document.querySelector('#poke-info')

const pokemonURL = 'https://pokeapi.co/api/v2/pokemon'
const pokeQueryParams = new URLSearchParams(window.location.search)
const pokemon_id = pokeQueryParams.get("pokemon_id")

fetch(`${pokemonURL}/${pokemon_id}`)
    .then(response => response.json())
    .then(pokemon => {
        displayPokemon(pokemon)
    })

function displayPokemon(pokemon) {
    const largePokemonCard = document.createElement("div")
    largePokemonCard.classList.add("large-pokemon-card")
    largePokemonCard.id = `${pokemon.types[0].type.name}`

    const pokemonId = document.createElement("p")
    pokemonId.textContent = `${pokemon.id}`
    pokemonId.classList.add("pokemon-id")

    const pokemonName = document.createElement('h1');
    pokemonName.classList.add('poke-name')
    pokemonName.textContent = `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`
    
    const pokemonPhoto = document.createElement('img');
    pokemonPhoto.src = `${pokemon.sprites.front_default}`
    pokemonPhoto.classList.add('poke-image')
    
    const pokemonType = document.createElement('p');
    pokemonType.textContent = `Type: ${pokemon.types[0].type.name}`
    
    const pokemonAbility = document.createElement('p');
    pokemonAbility.textContent = `Abilities: ${pokemon.abilities.map(ability => ability.ability.name).join(", ")}`

    pokeDiv.append(largePokemonCard)
    largePokemonCard.append(pokemonId, pokemonName, pokemonPhoto, pokemonType, pokemonAbility);
    }

    // const pokemonSpeciesUrl = "https://pokeapi.co/api/v2/pokemon-species"
    // fetch(`${pokemonSpeciesUrl}/1`)
    //     .then(response => response.json())
    //     .then(pokemonDetails => {
    //         displayDetails(pokemonDetails)
    //     })
    
    // function displayDetails(pokemonDetails) {
    //     const pokemonDescription = pokemonDetails.flavor_text_entries[0].flavor_text
    //     console.log(pokemonDescription)
    // }