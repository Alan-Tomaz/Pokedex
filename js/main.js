const pokemonList = document.getElementById('pokedex')
const loadMoreButton = document.getElementById('load-more')

const maxRecords = 1008;
const limit = 20;
let offset = 0;


function loadPokemonItems(offset, limit) {
    function convertPokemonToLi(pokemon) {
        return `
            <li class="card bg-${pokemon.type}">
<div class="pokemon-img">
            <img src = "${pokemon.photo}" class="card-image" alt="${pokemon.name}">
            </div>
                <h6 class="pokemon-id">#${pokemon.number}</h6>
                <h2 class="pokemon-name">${pokemon.name}</h2>
                <div class="pokemon-types">
                        ${pokemon.types.map((type) => `<div class="pokemon-type ${type}">${type}</div>`).join('')}
                </div>
            </li>
        `
    }
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) =>
            `
             <li class = "card bg-${pokemon.type}">
                 <div class = "pokemon-img">
                <img src = "${pokemon.photo}" class = "card-image" alt = "${(pokemon.name).charAt(0).toUpperCase() + pokemon.name.slice(1)}">
                 </div> 
                 <h6 class = "pokemon-id">#${pokemon.number}</h6> 
                 <h2 class = "pokemon-name">${(pokemon.name).charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2> 
                 <div class = "pokemon-types" >
                 ${pokemon.types.map((type) => `<div class="pokemon-type ${type}">${type.charAt(0).toUpperCase() + type.slice(1)}</div>`).join('')} 
                </div> 
                </li>
        `).join('')

        pokemonList.innerHTML += newHtml

    })
}

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordWithNextPage = offset + limit

    if (qtdRecordWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItems(offset, limit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItems(offset, limit)
    }


})