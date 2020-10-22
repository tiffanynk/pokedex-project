const pokeTypeURL = 'https://pokeapi.co/api/v2/type/'
const pokeQueryParams = new URLSearchParams(window.location.search)
const typeParams = new URLSearchParams(window.location.search);
const typeSearch = typeParams.get('type')

const pokedex = document.getElementById('pokedex');
const pokemonSearchForm = document.querySelector('#pokemon-search-form');
const pokemonTypeSearch = document.querySelector('.type-filter')

let pokemonArray = [];

const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 151; i++) {
        const pokemonURL = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(pokemonURL) 
            .then(response => response.json())
        )
    }
    Promise.all(promises)
    .then(allPokemon => {
        console.log(allPokemon)
        const firstGenPokemon = allPokemon.map(pokemon => ({
            frontImage: pokemon.sprites['front_default'],
            pokemon_id: pokemon.id,
            name: pokemon.name,
            type: pokemon.types[0].type.name,
            abilities: pokemon.abilities.map(ability => ability.ability.name).join(', '),
            backImage: pokemon.sprites['back_default'],
            description: pokemon.species.url
        }))
        pokemonArray = firstGenPokemon
        // console.log(firstGenPokemon)
        createPokemonCards(firstGenPokemon)
    })
}

fetchPokemon()

pokemonSearchForm.addEventListener('input', (event) => {
    const filteredPokemon = pokemonArray.filter(pokemon => pokemon.name.includes(event.target.value.toLowerCase()))
    // console.log('input', pokemonArray)
    clearPokedex()
    createPokemonCards(filteredPokemon)
})

fetch(pokeTypeURL)
    .then(response => response.json())
    .then(pokeTypes => {
        pokeTypes.results.forEach(type => {
            const option = document.createElement('option')

            option.textContent = type.name
            option.value = type.name

            pokemonTypeSearch.appendChild(option)
        })
    })

function clearPokedex() {
    let section = document.querySelector('#pokedex')

    section.innerHTML = ''
}

function createPokemonCards(pokemons) {
    // console.log(pokemons)
    pokemons.forEach(pokemon => {
        createPokemonCard(pokemon)
        // fetchDescription(pokemon)
    })
}

// const fetchDescription = (pokemon) => {
//     (fetch(pokemon.description))
//         .then(response => response.json())
//         .then(renderDescription)
// }

// function renderDescription(speciesInfo) {
//     speciesInfo.flavor_text_entries[3].flavor_text
// }

function createPokemonCard(pokemon) {
    // total card
    const flipCard = document.createElement("div")
    flipCard.classList.add("flip-card")
    flipCard.id = 'flip-card-id'
    pokedex.append(flipCard)
    
    // front & back container
    const flipCardInner = document.createElement("div")
    flipCardInner.classList.add("flip-card-inner")
    flipCardInner.id = `${pokemon.type}`
    flipCard.append(flipCardInner)

    // front of card
    const frontCard = document.createElement("div")
    frontCard.classList.add('front-pokemon-card')

    const frontImage = document.createElement('img')
    frontImage.src = `${pokemon.frontImage}`
    frontImage.classList.add("front-pokemon-image")

    const frontPokeName = document.createElement('h2')
    frontPokeName.innerHTML = `<a href="/pokemon.html?pokemon_id=${pokemon.pokemon_id}">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</a>`

    const frontPokeID = document.createElement('p')
    frontPokeID.textContent = `#${pokemon.pokemon_id}`
    frontPokeID.classList.add("front-poke-id")

    const frontDescription = document.createElement("p")
    
    
    const frontPokeType = document.createElement('p')
    frontPokeType.textContent = `${pokemon.type.toUpperCase()}`
    frontPokeType.classList.add("front-pokemon-type")

    

    frontCard.append(frontImage, frontPokeID, frontPokeName, frontDescription, frontPokeType)
    
    // back of card
    const backCard = document.createElement("div")
    backCard.classList.add('back-pokemon-card')

    const backImage = document.createElement('img')
    backImage.src = `${pokemon.backImage}`
    backImage.classList.add("back-pokemon-image")

    const backPokeID = document.createElement('p')
    backPokeID.textContent = `#${pokemon.pokemon_id}`
    backPokeID.classList.add("back-poke-id")

    const backPokeName = document.createElement('h2')
    backPokeName.innerHTML = `<a href="/pokemon.html?pokemon_id=${pokemon.pokemon_id}">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</a>`
    backPokeName.classList.add("back-pokemon-name")

    const backPokeAbilities = document.createElement("p")
    backPokeAbilities.textContent = `Abilities: ${pokemon.abilities}`
    backPokeAbilities.classList.add("back-pokemon-abilities")

    backCard.append(backImage, backPokeID, backPokeName, backPokeAbilities)

    // append
    flipCardInner.append(frontCard, backCard)
}



// const pokeQueryParams = new URLSearchParams(window.location.search)
// const pokemon_id = pokeQueryParams.get("pokemon_id")

// for (let i = 1; i <= 151; i++) {
//     const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${i}`;
//     fetch(pokemonSpeciesUrl)
//         .then(response => response.json())
//         .then(pokemonDetails => {
//             displayDetails(pokemonDetails)
//         })
//     }


// function displayDetails(allPokemonDetails) {
     
//     allPokemonDetails.map(detail => {
//          pokeDescription: detail.flavor_text_entries[3].flavor_text
//     })

