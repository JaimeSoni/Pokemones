const CARDS = 5;

// Petición de los pokemones
for (let i = 1; i <= CARDS; i++) {
    let id = getRandomId(150);
    searchPokemonById(id);
}

function getRandomId(max) {
    return Math.floor(Math.random() * max) + 1;
}

let draggableElements = document.querySelector('.draggable-elements');
let droppableElements = document.querySelector('.droppable-elements');

let pokemonSearched = [];
let pokemonNames = [];

async function searchPokemonById(id) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const data = await res.json();
    pokemonSearched.push(data);
    pokemonNames.push(data.name);

    pokemonNames = pokemonNames.sort(() => Math.random() - 0.5);

    draggableElements.innerHTML = '';

    pokemonSearched.forEach(pokemon => {
        draggableElements.innerHTML += `
            <div class="pokemon">
                <img id="${pokemon.name}" draggable="true" class="image" src="${pokemon.sprites.other['official-artwork'].front_default}" alt="">
            </div>`;
    });

    droppableElements.innerHTML = '';
    pokemonNames.forEach(name => {
        droppableElements.innerHTML += `
            <div class="names">
                <p>${name}</p>
            </div>`;
    });

    let pokemons = document.querySelectorAll('.image');
    pokemons = [...pokemons];
    pokemons.forEach(pokemon => {
        pokemon.addEventListener('dragstart', event => {
            event.dataTransfer.setData('text', event.target.id);
        });
    });

    let names = document.querySelectorAll('.names');
    let wrongMsg = document.querySelector('.wrong');
    let points = 0;

    names.forEach(name => {
        name.addEventListener('dragover', event => {
            event.preventDefault();
        });
        name.addEventListener('drop', event => {
            const draggableElementData = event.dataTransfer.getData('text');
            let pokemonElement = document.querySelector(`#${draggableElementData}`);

            if (event.target.innerText === draggableElementData) {
                console.log('Si');
                points++;
                event.target.innerHTML = '';
                event.target.appendChild(pokemonElement); 
                wrongMsg.innerText = '';

                if (points === CARDS) {
                    draggableElements.innerHTML = `<p class="win">Ganaste!</p>`;
                }

            } else {
                wrongMsg.innerText = '¡Ups!';
            }
        });
    });
}
