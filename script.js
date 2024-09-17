const listPokemonName = document.getElementById('list-pokemon-name')
const listPokemonType = document.getElementById('list-pokemon-type')

async function pokemonType(){
    try{
        const res = await fetch('https://pokeapi.co/api/v2/type/?limit=150')
        const data = await res.json()
        const pokeType = data.results
        pokeType.forEach(pokemon => {
            const listName = document.createElement('li')
            const name = document.createElement('a')
            name.setAttribute('href', '#')
            name.innerHTML = pokemon.name
            listName.appendChild(name)
            listPokemonType.appendChild(listName)
            name.addEventListener('click', (event)=> {
                event.preventDefault()
                pokemonName(pokemon.url)
            })
        })
    }catch(error){
        console.error(error);
    }
}

async function pokemonName(pokeUrlType){
    listPokemonName.innerHTML = ''
    try{
        const res = await fetch(pokeUrlType)
        const data = await res.json()
        const pokeName = data.pokemon
        if(pokeName.length === 0){
            const l1 = document.createElement('li')
            l1.innerHTML='Tidak ada pokemon dengan tipe ini'
            listPokemonName.appendChild(l1)
        } else{
            pokeName.forEach(pokemon => {
                const listName = document.createElement('li')
                const name = document.createElement('a')
                name.setAttribute('href', '#')
                name.innerHTML = pokemon.pokemon.name
                listName.appendChild(name)
                listPokemonName.appendChild(listName)
                name.addEventListener('click', (event)=>{
                    event.preventDefault()
                    pokemonImg(pokemon.pokemon.url)
                })
            })
        }
    }catch(error){
        console.error(error);
    }
}

async function pokemonImg(pokeImg){
    const pokemonImg = document.getElementById('pokemon-img')
    const pokemonName = document.getElementById('pokemon-name')
    const pokemonType = document.getElementById('pokemon-type')
    const row = document.querySelector('.row2')
    row.innerHTML = ''
    const pokemonHp = document.getElementById('pokemon-hp')
    const pokemonAtt = document.getElementById('pokemon-attack')
    const pokemonSpd = document.getElementById('pokemon-speed')
    const pokemonDef = document.getElementById('pokemon-def')
    try{
        const res = await fetch(pokeImg)
        const data = await res.json()
        
        const imgUrl = data.sprites.other.dream_world.front_default
        pokemonImg.src = imgUrl

        const nameUrl = data.name
        pokemonName.innerHTML = nameUrl

        const typeUrl = '(' + data.types[0].type.name + ')'
        pokemonType.innerHTML = typeUrl

        const abil = data.abilities
        abil.forEach(pokemon => {
            const ab1 = document.createElement('h4')
            ab1.innerHTML = pokemon.ability.name
            row.append(ab1)
        })

        pokemonHp.innerHTML = data.stats[0].base_stat
        pokemonAtt.innerHTML = data.stats[1].base_stat
        pokemonDef.innerHTML = data.stats[2].base_stat
        pokemonSpd.innerHTML = data.stats[5].base_stat

    }catch(error){
        console.error(error);
    }
}

pokemonType()
// pokemonName()
