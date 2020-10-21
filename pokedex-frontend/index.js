const pokedex = document.getElementById('pokedex')
const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 150; i++) {
        const pokemonURL = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(pokemonURL)
            .then(response => response.json())
        )
    }
    Promise.all(promises)
    .then(allPokemon => {
        const firstGenPokemon = allPokemon.map(pokemon => ({
            photo: pokemon.sprites['front_default'],
            pokemon_id: pokemon.id,
            name: pokemon.name,
            type: pokemon.types[0].type.name,
            abilities: pokemon.abilities.map(ability => ability.ability.name).join(', '),
        }))
        createPokemonCards(firstGenPokemon)
    })
}

fetchPokemon()

function createPokemonCards(pokemons) {
    pokemons.forEach(pokemon => {
        createPokemonCard(pokemon)
    })
}

function createPokemonCard(pokemon) {
    const pokemonCard = document.createElement('div')
    pokemonCard.classList.add('pokemon-card')
    pokemonCard.id = `${pokemon.type}`

    const pokePhoto = document.createElement('img')
    pokePhoto.src = `${pokemon.photo}`
    pokePhoto.classList.add("pokemon-image")

    const pokeName = document.createElement('h2')
    pokeName.innerHTML = `<a href="/pokemon.html?pokemon_id=${pokemon.pokemon_id}">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</a>`

    const pokeID = document.createElement('p')
    pokeID.textContent = `#${pokemon.pokemon_id}`
    pokeID.classList.add("poke-id")
    
    const pokeType = document.createElement('p')
    pokeType.textContent = `${pokemon.type.toUpperCase()}`
    pokeType.classList.add("pokemon-type")


    pokedex.append(pokemonCard)
    pokemonCard.append(pokePhoto, pokeID, pokeName, pokeType)
}

