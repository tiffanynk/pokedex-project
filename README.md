<h1>Mod2 Project | Flatiron School</h1>

<h2><img src="https://i.ibb.co/TBWb6FL/Storytelling.png" alt="Storytelling" border="0">Pokedex</h2>
<p>
Our Pokedex is a webapp that utilizes Javascript, HTML, and CSS. Utilizing the PokeAPI, we created a Pokedex with the first Generation (Kanto) Pokemon. Our intention with this project was to work with a larger, more complex API and expand our knowledge on styling with CSS.<br>
<br>“It’s more important to master the cards you’re holding than to complain about the ones your opponent was dealt.” – Grimsley :zap:</br>
</p>

<h2>Technologies</h2>

<ul>
 <li>JavaScript</li>
 <li>HTML5</li>
 <li>CSS</li>
</ul>

<h2>Setup</h2>
To run this project, install it locally by cloning this GitHub repository and opening it in your code editor.<br><br>
From there, navigate into the folder titled <b>pokedex-frontend</b> and run <code>lite-server</code> in your terminal.<br><br>
This should prompt your browser to open a page at: <code>localhost:3001</code><br><br>
You are now ready to start using the first iteration of our Pokedex! Please see our features section to learn more!<br><br>

<h2>Instructions</h2>
Once you have opened the project through lite-server, you can find all 151 First Generation Pokemon by either searching for its name or browsing Pokemon by type.<br><br>
To clear your search results, just click <i>Reset</i>. <br><br>
To see more information about a specific Pokemon, hover over its card and click on its name!<br><br>
To navigate back to the homepage after being directed to an individual Pokemon page, please click the Pokeball at the top of the page.

<h2>Code Examples</h2>
Our initial fetch call for the main page:


```javascript
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
            description: pokemon.species.url
        }))
        pokemonArray = firstGenPokemon
        createPokemonCards(firstGenPokemon)
    })
    .then(generateTypes)
}
```

Creating elements for Pokemon descriptions after making a request to the PokeAPI:
``` javascript 
function displayDetails(pokemonDetails) {
        const findDetailsContainer = document.querySelector(".details-container")
        const pokemonDescription = document.createElement('p');
        pokemonDescription.classList.add("description")
        pokemonDescription.textContent = `${pokemonDetails.flavor_text_entries[3].flavor_text}`

        findDetailsContainer.append(pokemonDescription)
    }
```


<h2>App Preview</h2>
<b>Flip Pokemon Card Feature:</b>
<img src="https://media.giphy.com/media/xuiGJFyU6dZWnoSYRb/giphy.gif" alt="Flip Pokemon Card" border="0"><br><br>
<b>Individual Pokemon Page:</b>
<img src="https://media.giphy.com/media/y6O2dCx4ofbxTn8ahw/giphy.gif" alt="Individual Pokemon Page"><br><br>
<b>Filter Pokemon by Type:</b><br>
<p>Each Pokemon card is color coded according to its Pokemon Type!</p>
<img src="https://media.giphy.com/media/0VQf1Qse9JBc5YN1Av/giphy.gif" alt="Filter by Type Feature"><br><br>
<b>Filter Pokemon by Name:</b>
<img src="https://media.giphy.com/media/ZjrEc4wtpYK6uc7gfn/giphy.gif" alt="Filter by Name Feature"><br><br>
<h2>User Stories</h2>

<h3>As a user, you will be able to:</h3>

<ol>
 <li>See a list of all first generation Pokemon names and pictures.</li>
 <li>see the list of Pokemon name and picture as a Pokemon card.</li>
 <li>Click on a Pokemon and see a page of its information.</li>
 <li>Search for a Pokemon using its name</li>
 <li>See more information about a pokemon in the back of the card.</li>
</ol>

<h2>Status</h2>

<p>We set out create a functional and aesthetically pleasing Pokedex.</p>

With time, we would like to refactor our code and add features such as:
<li>Adding Favorites</li>
<li>Creating User Log ins</li>
<li>Add Pokemon Ability descriptions.</li>
<li>Update Pokemon photos.</li>
<li>Add a button to navigate back to the top of the page.</li>

<h2>Challenges</h2>
<li>How to handle the pokémon data (store it in db, FE only, some combination)</li>
<li>Limiting the struggle cycle! Looking over each other's code when we were stuck proved to be incredibly helpful.</li>
<li>How to access information from different endpoints of the API.</li>
<li>How to remove duplicates and recreate Pokémon cards after the Name search</li>

<h2>Contact</h2>
<a href="https://www.linkedin.com/in/tiffany-kanjanabout/"><img src="https://user-images.githubusercontent.com/68958970/94946276-dc7b8a00-04a9-11eb-9431-366689b9fa06.png" alt="Tiffany Kanjanabout" style="width:10px;height:10px;"></a>Tiffany Kanjanabout :octocat:<br>
<a href="https://www.linkedin.com/in/paigeamiles/"><img src="https://user-images.githubusercontent.com/68958970/94946276-dc7b8a00-04a9-11eb-9431-366689b9fa06.png" alt="Paige Miles" style="width:10px;height:10px;"></a>Paige Miles :evergreen_tree:<br>

<h2>API Reference</h2>
[PokeAPI](https://pokeapi.co/)
<div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
