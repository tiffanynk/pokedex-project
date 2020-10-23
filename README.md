<h1>Mod2 Project | Flatiron School</h1>
<h2><img src="https://i.ibb.co/K51S358/pokepointer.png" alt="Pokedex Image">Pokedex</h2>

*A blub goes here*

<br></br>
<h2>General Info</h2>
<p>
Our Pokedex is a webapp that utilizes Javascript, HTML, and CSS. Utilizing the PokeAPI, we created a Pokedex with the first Generation (Kanto) Pokemon.<br>
<br>“It’s more important to master the cards you’re holding than to complain about the ones your opponent was dealt.” – Grimsley :heart:</br>
</p>

<h2>Inspiration</h2>

<p>Some text will go here</p>

<h2>Intro Video</h2>

[Youtube](LINK GOES HERE)

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
  const pokemonCard = document.querySelector(".large-pokemon-card")
  console.log(pokemonCard)
  const pokemonDescription = document.createElement('p');
  pokemonDescription.classList.add("description")
  pokemonDescription.textContent = `${pokemonDetails.flavor_text_entries[3].flavor_text}`

  pokemonCard.append(pokemonDescription)
}   
```


<h2>App Preview</h2>
Flip Pokemon Card Feature:
<img src="https://giphy.com/gifs/xuiGJFyU6dZWnoSYRb/html5" alt="Flip Pokemon Card" border="0"><br><br>
Filter Pokemon by Type:
<img src="https://i.ibb.co/QksvhH4/Screen-Shot-2020-10-02-at-10-52-47-AM.png" alt="Log in screen"><br><br>
Filter Pokemon by Name:
<img src="https://i.ibb.co/QksvhH4/Screen-Shot-2020-10-02-at-10-52-47-AM.png" alt="Log in screen"><br><br>
<h2>User Stories</h2>

<h3>As a user, you will be able to:</h3>

<ol>
<li>Join the Studio Ghibli community.</li>
<li>See a curated list of the top 10 film suggestions based on Rotten Tomatoes scores.</li>
<li>Explore the Studio Ghibli film catalogue.</li>
<li>See and add films to a list of your favorites.</li>
</ol>

<h2>Status</h2>

<p>We set out to match users based on favorite films. We would’ve liked to create an app that delivered on that.</p>

With time, we would've liked to refactor our code and add features such as:
<li>Updating Favorites</li>
<li>Removing Favorites</li>
<li>Match with a Friend</li>
<li>Once a user signs up, returning that user to log in screen.</li>

<h2>Contact</h2>
<a href="https://www.linkedin.com/in/tiffany-kanjanabout/"><img src="https://user-images.githubusercontent.com/68958970/94946276-dc7b8a00-04a9-11eb-9431-366689b9fa06.png" alt="Tiffany Kanjanabout" style="width:10px;height:10px;"></a>Tiffany Kanjanabout :octocat:<br>
<a href="https://www.linkedin.com/in/jonathannoriega/"><img src="https://user-images.githubusercontent.com/68958970/94946276-dc7b8a00-04a9-11eb-9431-366689b9fa06.png" alt="Jon Noriega" style="width:10px;height:10px;"></a>Jon Noriega :ocean:<br>

<h2>API Reference</h2>
[Studio Ghibli API](https://ghibliapi.herokuapp.com/)
