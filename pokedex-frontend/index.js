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
    const pokePhoto = document.createElement('img')
    const pokeName = document.createElement('h2')
    const pokeID = document.createElement('p')
    const pokeType = document.createElement('p')

    pokemonCard.classList.add('pokemon-card')
    pokemonCard.id = `${pokemon.type}`
    pokePhoto.src = `${pokemon.photo}`
    pokeID.textContent = `Pokemon ID: ${pokemon.pokemon_id}`
    pokeName.innerHTML = `<a href="/pokemon.html?pokeID=${pokemon.id}">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</a>`
    pokeType.textContent = `${pokemon.type.charAt(0).toUpperCase() + pokemon.type.slice(1)}`

    pokedex.append(pokemonCard)
    pokemonCard.append(pokePhoto, pokeID, pokeName, pokeType)
}