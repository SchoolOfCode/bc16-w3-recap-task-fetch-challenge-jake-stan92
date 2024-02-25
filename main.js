// 151 total pokemon
// https://pokeapi.co/api/v2/pokemon/{randint will return random} // name will return specific
// 2 pokemon vs each other - I choose you! {name} --- fight cat (type)
// add score for ea win
// load new pokemon after each round

// global variables
let score = 0

// while loop for game?

// define HTML variables
// pokemon1
const pokemon1Img = document.querySelector('#pokemon1-img')
const pokemon1Name = document.querySelector('#pokemon1-name')
const pokemon1Btn = document.querySelector('#pokemon1-button')

// pokemon2
const pokemon2Img = document.querySelector('#pokemon2-img')
const pokemon2Name = document.querySelector('#pokemon2-name')
const pokemon2Btn = document.querySelector('#pokemon2-button')

//buttons
const choiceBtns = document.querySelectorAll('button');

// score P tag
const scoreContent = document.querySelector('#score-to-update')

// Round outcome text
const outcomeText = document.querySelector('#outcome-text');

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
    // const pokemon1 = await option1
    // const pokemon2 = await option2

    //pokemon 1 
    pokemon1Img.setAttribute('src', option1.imgSrc)
    pokemon1Name.textContent =  capitalFirst(option1.name)

    // pokemon2
    pokemon2Img.setAttribute('src', option2.imgSrc)
    pokemon2Name.textContent =  capitalFirst(option2.name)

    //set buttons value to type (for game purposes)
    pokemon1Btn.setAttribute('value', option1.type)
    pokemon2Btn.setAttribute('value', option2.type)
}

// displayPokemon(getPokemon(2), getPokemon(5))

// store pokemon types for 1 round

function playRound(type1, type2) {
    // gameContinue = false
    let pokemon1Type = {};
    let pokemon2Type = {}
    // loop types
    for (let i = 0; i < types.length; i++) {
        if (type1 === types[i].type) {
            pokemon1Type = types[i]
        }
        if (type2 === types[i].type) {
            pokemon2Type = types[i]
        }
    }

    // if type 1 cat is in type 2 weakness - type 1 wins
    if (pokemon2Type.weakVS.includes(pokemon1Type.type)) {
        updateOutcome(`you win ${pokemon1Type.type} wins vs ${pokemon2Type.type}`)
        // if type 1 cat is in type 2 strong - type 1 loses
        score ++
        updateScore()
        nextRound();
    } else if (pokemon2Type.strongVS.includes(pokemon1Type.type)) {
        if (confirm(`you lose ${pokemon2Type.type} wins vs ${pokemon1Type.type} -- Play Again?`)) {
            score = 0
            updateScore()
            updateOutcome('')
            game()
        }
    } else {
        updateOutcome(`It's a tie => ${pokemon1Type.type} vs ${pokemon2Type.type}`)
        nextRound();
    }  
}

function updateScore() {
    scoreContent.textContent = score
}

function updateOutcome(text) {
    outcomeText.textContent = text;
}

function capitalFirst(word) {
    const capitalised = word.charAt(0).toUpperCase() + word.slice(1)
    return capitalised
} 

async function nextRound() {
    const pokemon1 = await getPokemon(generateRandom());
    const pokemon2 = await getPokemon(generateRandom());
    // const pokemon1 = await getPokemon(3);
    // const pokemon2 = await getPokemon(50);
    displayPokemon(pokemon1, pokemon2)
    // playRound(pokemon1.type, pokemon2.type)
}

async function game() {
    nextRound()
}

game()

// play game on button click // 'type1' is always players choice
pokemon1Btn.addEventListener('click', (e) => {
    const type1 = e.target.value
    console.log(type1)
    const type2 = pokemon2Btn.value
    playRound(type1, type2)
})

pokemon2Btn.addEventListener('click', (e) => {
    const type1 = e.target.value
    console.log(type1)
    const type2 = pokemon1Btn.value
    playRound(type1, type2)
})


// compare pokemon cats againts ea other
// if win add 1
// if lose game over
// new game?

// list types and their strengths/weaknesses
// https://www.theloadout.com/pokemon-type-chart
const types = [
    {
        type: 'normal',
        strongVS: [],
        weakVS: ['fighting']
    },
    {
        type: 'fighting',
        strongVS: ['normal', 'rock', 'steel', 'ice', 'dark'],
        weakVS: ['flying', 'psychic', 'fairy']
    },
    {
        type: 'flying',
        strongVS: ['fighting', 'bug', 'grass'],
        weakVS: ['rock', 'electric', 'ice']
    },
    {
        type: 'poison',
        strongVS: ['grass', 'fairy'],
        weakVS: ['ground', 'psychic']
    },
    {
        type: 'ground',
        strongVS: ['poison', 'rock', 'steel', 'fire', 'electric'],
        weakVS: ['water', 'grass', 'ice']
    },
    {
        type: 'rock',
        strongVS: ['flying', 'bug', 'fire', 'ice'],
        weakVS: ['fighting', 'ground', 'steel', 'water', 'grass']
    },
    {
        type: 'grass',
        strongVS: ['ground', 'rock', 'water'],
        weakVS: ['flying', 'poison', 'bug', 'fire', 'ice']
    },
    {
        type: 'bug',
        strongVS: ['grass', 'psychic', 'dark'],
        weakVS: ['flying', 'rock', 'fire']
    },
    // ghost vs ghost anomoly
    {
        type: 'ghost',
        strongVS: ['ghost', 'psychic'],
        weakVS: ['ghost', 'dark']
    },
    {
        type: 'steel',
        strongVS: ['rock', 'ice', 'fairy'],
        weakVS: ['fighting', 'ground', 'fire']
    },
    {
        type: 'fire',
        strongVS: ['bug', 'steel' ,'grass', 'ice'],
        weakVS: ['ground', 'rock', 'water']
    },
    {
        type: 'water',
        strongVS: ['ground', 'rock', 'fire'],
        weakVS: ['grass', 'electric']
    },
    {
        type: 'electric',
        strongVS: ['flying', 'water'],
        weakVS: ['ground']
    },
    {
        type: 'psychic',
        strongVS: ['fighting', 'poison'],
        weakVS: ['bug', 'ghost', 'dark']
    },
    {
        type: 'ice',
        strongVS: ['flying', 'ground', 'grass', 'dragon'],
        weakVS: ['fighting', 'bug', 'fairy']
    },
    {
        //dragon vs dragon anomoly
        type: 'dragon',
        strongVS: ['dragon'],
        weakVS: ['ice', 'dragon', 'fairy']
    },
    {
        type: 'dark',
        strongVS: ['ghost', 'psychic'],
        weakVS: ['fighting', 'bug', 'fairy']
    },
    {
        type: 'fairy',
        strongVS: ['fighting', 'dragon', 'dark'],
        weakVS: ['poison', 'steel']
    },
]

{/* <button class="choose-pokemon-button" id="pokemon2-button"><img class="poke-ball-img" src="./images/pokeball.jpg"></button> */}



