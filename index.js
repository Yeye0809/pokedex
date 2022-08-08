const pokeName = document.getElementById('poke-name');
const pokeImg = document.getElementById('poke-sprite');
const pokeType = document.getElementById('poke-type');
const pokeStats = document.getElementById('poke-stats');




const searchPokemon = (e) => {
    e.preventDefault();
    const {value} = e.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
    .then(resp => resp.json())
    .then(data => renderPokeData(data))
    .catch(err => renderNotFound() )
    
}

const renderPokeData = ( data ) => {
    
    const sprite = data.sprites.front_default;
    const { stats, types } = data;

    pokeName.textContent = data.name;
    pokeImg.setAttribute('src', sprite )

    renderPokeTypes(types);
    renderpokeStats(stats);
    
    
}

const renderPokeTypes = ( types ) => {

    pokeType.innerHTML = '';
    types.forEach(type => {
        const typeTextElemnt = document.createElement('div');
        typeTextElemnt.textContent = type.type.name;
        pokeType.appendChild(typeTextElemnt);
    });
}

const renderpokeStats = ( stats ) => {

    pokeStats.innerHTML = '';
    stats.forEach( stat => {
        const statElement = document.createElement('div');
        const statElementName = document.createElement('div');
        const statElementAmount = document.createElement('div');

        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);

        pokeStats.appendChild(statElement);
    })
}

const renderNotFound = () => {
    pokeName.textContent = 'No encontrado';
    pokeImg.setAttribute('src', './assets/poke-shadow.png');
    pokeType.innerHTML = '';
    pokeStats.innerHTML = '';

}