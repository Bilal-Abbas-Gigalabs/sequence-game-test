// Single Deck Cards
var cards = ["AS", "AH", "AD", "AC", "S2", "H2", "D2", "C2", "S3", "H3", "D3", "C3",
    "S4", "H4", "D4", "C4", "S5", "H5", "D5", "C5", "S6", "H6", "D6", "C6",
    "S7", "H7", "D7", "C7", "S8", "H8", "D8", "C8", "S9", "H9", "D9", "C9", "S10", "H10", "D10", "C10",
    "JS", "JH", "JD", "JC", "QS", "QH", "QD", "QC", "KS", "KH", "KD", "KC"];

var boardDeck = ["AS", "AH", "AD", "AC", "S2", "H2", "D2", "C2", "S3", "H3", "D3", "C3",
    "S4", "H4", "D4", "C4", "S5", "H5", "D5", "C5", "S6", "H6", "D6", "C6",
    "S7", "H7", "D7", "C7", "S8", "H8", "D8", "C8", "S9", "H9", "D9", "C9", "S10", "H10", "D10", "C10",
    "QS", "QH", "QD", "QC", "KS", "KH", "KD", "KC"];

// Double Decks
let doubleDeck = cards.concat(cards);
let boardDoubleDeck = boardDeck.concat(boardDeck);

// BoardCards

let boardCards = document.getElementById('board-cards');
for(let board=0; board <= 95; board++){
    let eleid = 10+board;
    let li = document.createElement("li");
    let img = document.createElement("img");
    li.setAttribute('class', 'disabledelement');
    li.setAttribute('id', `c${eleid}`);
    boardCards.appendChild(li);
    if(board == 0 || board == 8 || board == 88 ){
        let div = document.createElement("div");
        div.setAttribute('class', 'empty-img');
        img.setAttribute('src', 'src/cards/corner.png');
        div.appendChild(img)
        li.appendChild(div);
        boardCards.appendChild(li);

        let sli = document.createElement("li");
        sli.setAttribute('class', 'disabledelement');
        sli.setAttribute('card', boardDoubleDeck[board]);
        let simg = document.createElement("img");
        simg.setAttribute('src', `src/cards/${boardDoubleDeck[board]}.png`);
        sli.appendChild(simg);
        boardCards.appendChild(sli);
    }
    else{
        li.setAttribute('card', boardDoubleDeck[board]);
        img.setAttribute('src', `src/cards/${boardDoubleDeck[board]}.png`);
        li.appendChild(img);
        boardCards.appendChild(li);
    }
    if(board == 95){
        let sli = document.createElement("li");
        sli.setAttribute('class', 'disabledelement');
        sli.setAttribute('card', boardDoubleDeck[board]);
        let simg = document.createElement("img");
        simg.setAttribute('src', `src/cards/${boardDoubleDeck[board]}.png`);
        sli.appendChild(simg);
        boardCards.appendChild(sli);

        let div = document.createElement("div");
        div.setAttribute('class', 'empty-img');
        img.setAttribute('src', 'src/cards/corner.png');
        div.appendChild(img)
        li.appendChild(div);
        boardCards.appendChild(li);
    }
}

// Shuffle
const shuffle = (doubleDeck) => {
    const arr_val = doubleDeck;
    for (let ar = 0; ar < arr_val.length; ar++) {
        let j = parseInt(Math.random() * arr_val.length);
        let temp = arr_val[ar];
        arr_val[ar] = arr_val[j];
        arr_val[j] = temp;
    }
    return arr_val;
}

// let user1 = document.getElementById('user1');
// let user2 = document.getElementById('user2');

let shuffled = shuffle(doubleDeck);
console.log("Shuffled", shuffled)

// Number of players and Cards distribution to each Player
let players = [];
let playerFunc = (noofplayer, noofCards) =>{
    for(let play = 1; play <= noofplayer; play++){
        let playerCards = []
        let user = document.getElementById(`user${play}`);
        for ( let i = 0; i < noofCards; i++) {
            let li = document.createElement("li");
            li.setAttribute('id', shuffled[0]);
            li.setAttribute('class', 'handcard');
            let img = document.createElement("img");
            img.setAttribute('src', `src/cards/${shuffled[0]}.png`);
            playerCards.push(shuffled[0]);
            li.appendChild(img);
            user.appendChild(li);
            shuffled.shift();
        }
        players.push(playerCards);
    }
}
var color = ["red", "blue", "green"];
playerFunc(2, 6);

console.log("Players", players)
let player = {
    turn: "false",
    color: color[0],
    cards: players[0]

}

// for(let playerloop=1; playerloop <= 2; playerloop++){
//     player.cards
// }



// for (let i = 0; i < 6; i++) {
//     let li = document.createElement("li");
//     li.setAttribute('id', shuffled[i]);
//     li.setAttribute('class', 'handcard');
//     let img = document.createElement("img");
//     img.setAttribute('src', `src/cards/${shuffled[i]}.png`)
//     li.appendChild(img);
//     user1.appendChild(li);
// }

// for (let i = 6; i < 12; i++) {
//     let li = document.createElement("li");
//     li.setAttribute('id', shuffled[i]);
//     li.setAttribute('class', 'handcard');
//     let img = document.createElement("img");
//     img.setAttribute('src', `src/cards/${shuffled[i]}.png`)
//     li.appendChild(img);
//     user2.appendChild(li);
// }

// shuffled.splice(0, 12);
let remaingDeck = shuffled;
console.log("Remaining Deck", remaingDeck);

// Disable All Cards
let disableCards = ()=>{
    let removeClass = document.querySelectorAll('#board-cards li');
    removeClass.forEach(removes =>{
        removes.classList.remove('enable');
    });
}

// Enable Selected Cards 
let enableSelectedCards = (id)=>{
    console.log("Click Card ID ==", id);
    let boardCardCheck = document.querySelectorAll(`#board-cards li[card=${id}]`);
    boardCardCheck.forEach(selectedBoardCard =>{
        selectedBoardCard.classList.add('enable');
    });
}

let reassignPlayerCards = (cardId)=>{
    let remaininghandcard = document.querySelectorAll('#user1 li');
    remaininghandcard.forEach(remaing => {
        let remaingid = remaing.getAttribute("id");
        if(cardId == remaingid){
            let user = document.getElementById(`user1`);
            remaing.remove();
            let li = document.createElement("li");
            li.setAttribute('id', remaingDeck[0]);
            li.setAttribute('class', 'handcard');
            let img = document.createElement("img");
            img.setAttribute('src', `src/cards/${remaingDeck[0]}.png`);
            player.cards.push(remaingDeck[0]);
            remaingDeck.shift();
            li.appendChild(img)
            user.appendChild(li);
            console.log("remainasss", remaingDeck,  player.cards)
            return
        }
    });

}

// Discard Cards
let discardCards = [];
let pushCard = (cardId)=>{
    for(let i=0; i<=player.cards.length; i++){
        if(cardId == player.cards[i]){
            console.log("pushing", player.cards[i]);
            discardCards.unshift(player.cards[i]);
            player.cards.splice(i, 1);
            reassignPlayerCards(cardId);
        }
    }
}

// Match Hand Cards with board
var handcardClick = document.getElementsByClassName("handcard");
let handcardClickFunction = function() {

    //Disable All Cards
    disableCards();
    
    // Enable Selected Cards 
    let id = this.getAttribute("id");
    enableSelectedCards(id);

    // Board Cards Click
    let enableCards = document.querySelectorAll('#board-cards .enable');
    boadCardClick = function(){
        enableCards.forEach(enables =>{
            enables.classList.remove('enable');
        });
        
        this.classList.add(player.color);
        let cardId = this.getAttribute('card');
        pushCard(cardId);
        console.log("Click element", discardCards, player.cards);
    }
    for (var i = 0; i < enableCards.length; i++) {
        enableCards[i].addEventListener('click', boadCardClick);
    }
    

}
for (var i = 0; i < handcardClick.length; i++) {
    handcardClick[i].addEventListener('click', handcardClickFunction);
}


mappingFunction = (maped) =>{
    let boardCardCheck = document.querySelectorAll(`#board-cards li[card=${maped}]`);
    boardCardCheck.forEach(selectedBoardCard =>{
    selectedBoardCard.classList.add('enable');
    });
}

player.cards.map(mappingFunction);


