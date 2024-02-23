// 151 total pokemon
// https://pokeapi.co/api/v2/pokemon/{randint will return random} // name will return specific
// 2 pokemon vs each other - I choose you! {name} --- fight cat (type)
// add score for ea win
// load new pokemon after each round

// while loop for game?

// define HTML variables

// generate random num
function generateRandom() {
    const randomNum = Math.floor(Math.random() * (152 - 1) + 1 )
    return randomNum
}
// use api to get 2x random pokemon
async function getPokemon(randNum) {
    const url = `https://pokeapi.co/api/v2/pokemon/${randNum}`
    const response = await fetch(url);
    const data = await response.json()
    const pokemon = {
        name: data.name,
        type: data.types[0].type.name
    }
    return pokemon
}



// store pokemon types for 1 round
// buttons to choose your pokemon
// compare pokemon cats againts ea other
// if win add 1
// if lose game over
// new game?