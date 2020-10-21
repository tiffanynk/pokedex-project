const pokedex = document.getElementById('pokedex')
//SEARCH FORM SELECTOR SEE LINES 16-18 IN HTML
const pokemonSearchForm = document.querySelector('#pokemon-search-form')

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
            const pokemonCard = document.createElement('div')
            const filteredPokemon = firstGenPokemon.filter(pokemon => pokemon.name.includes(event.target.value.toLowerCase()))
            const filteredPokeHTML = createPokemonCards(filteredPokemon)
            console.log(filteredPokemon)
            //USING CONSOLE LOG TO MAKE SURE WE'RE GETTING THE RIGHT POKEMON
            pokemonCard.innerHTML = filteredPokeHTML ? filteredPokeHTML : "Uh oh! There aren't Pokémon here!"
            //THIS TERNARY STATES IF FILTERDPOKEHTML MATCHES A POKEMON (IS TRUE), IT SHOULD RETURN A NEW POKE CARD. 
            //IF FALSE RETURN ERROR MSG
            pokedex.append(pokemonCard)
          })
    })
}

fetchPokemon()

function createPokemonCards(pokemons) {
    pokemons.forEach(pokemon => {
        createPokemonCard(pokemon)
    })
}

function createPokemonCard(pokemon) {
    // total card
    const flipCard = document.createElement("div")
    flipCard.classList.add("flip-card")
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