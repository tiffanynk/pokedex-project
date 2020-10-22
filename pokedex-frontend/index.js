const pokedex = document.getElementById('pokedex')
//SEARCH FORM SELECTOR SEE LINES 16-18 IN HTML
const pokemonSearchForm = document.querySelector('#pokemon-search-form')

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
        const firstGenPokemon = allPokemon.map(pokemon => ({
            frontImage: pokemon.sprites['front_default'],
            pokemon_id: pokemon.id,
            name: pokemon.name,
            type: pokemon.types[0].type.name,
            abilities: pokemon.abilities.map(ability => ability.ability.name).join(', '),
            backImage: pokemon.sprites['back_default'],
        }))
        createPokemonCards(firstGenPokemon)
        //THIS IS FOR THE SEACH FORM
        pokemonSearchForm.addEventListener('input', (event) => {
            const filteredPokemon = firstGenPokemon.filter(pokemon => pokemon.name.includes(event.target.value.toLowerCase()))
            createPokemonCards(filteredPokemon)
          })
    })
}

fetchPokemon()

function createPokemonCards(pokemons) {

    if (pokemons.length > 150) {
        pokemons.forEach(pokemon => {
            createPokemonCard(pokemon)
        })
    } else if (pokemons.length > 0) {
        // how to remove divs inside a section
        let pokemonCards = document.querySelectorAll('#flip-card-id')

        pokemonCards.forEach(pokemonCard => {
            pokemonCard.remove()
        })

        pokemons.forEach(pokemon => {
            createPokemonCard(pokemon)
        })
    } else {
        let pokemonCards = document.querySelectorAll('#flip-card-id')
        pokemonCards.forEach(pokemonCard => {
            pokemonCard.remove()
        })
    }
}

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
    
    const frontPokeType = document.createElement('p')
    frontPokeType.textContent = `${pokemon.type.toUpperCase()}`
    frontPokeType.classList.add("front-pokemon-type")

    frontCard.append(frontImage, frontPokeID, frontPokeName, frontPokeType)
    
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


const pokeQueryParams = new URLSearchParams(window.location.search)
const pokemon_id = pokeQueryParams.get("pokemon_id")

for (let i = 1; i <= 151; i++) {
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${i}`;
    fetch(pokemonSpeciesUrl)
        .then(response => response.json())
        .then(pokemonDetails => {
            displayDetails(pokemonDetails)
        })
    }


function displayDetails(pokemonDetails) {
     console.log(pokemonDetails.flavor_text_entries[0].flavor_text)
}

