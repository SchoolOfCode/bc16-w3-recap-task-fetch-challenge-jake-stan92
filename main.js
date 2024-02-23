// 151 total pokemon
// https://pokeapi.co/api/v2/pokemon/{randint will return random} // name will return specific
// 2 pokemon vs each other - I choose you! {name} --- fight cat (type)
// add score for ea win
// load new pokemon after each round

// global variables

// while loop for game?

// define HTML variables
// pokemon1
const pokemon1Img = document.querySelector('#pokemon1-img')
const pokemon1Name = document.querySelector('#pokemon1-name')
// pokemon2
const pokemon2Img = document.querySelector('#pokemon2-img')
const pokemon2Name = document.querySelector('#pokemon2-name')

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
        type: data.types[0].type.name,
        imgSrc: data.sprites.front_default
    }
    // console.log(data)
    return pokemon
}

// display pokemon on page
async function displayPokemon(option1, option2) {
    const pokemon1 = await option1
    const pokemon2 = await option2

    //pokemon 1 
    pokemon1Img.setAttribute('src', pokemon1.imgSrc)
    pokemon1Name.textContent =  pokemon1.name

    // pokemon2
    pokemon2Img.setAttribute('src', pokemon2.imgSrc)
    pokemon2Name.textContent =  pokemon2.name
}

displayPokemon(getPokemon(2), getPokemon(5))

// store pokemon types for 1 round

// buttons to choose your pokemon

// compare pokemon cats againts ea other
// if win add 1
// if lose game over
// new game?