// Single Deck Cards
var cards = ["AS", "AH", "AD", "AC", "S2", "H2", "D2", "C2", "S3", "H3", "D3", "C3",
    "S4", "H4", "D4", "C4", "S5", "H5", "D5", "C5", "S6", "H6", "D6", "C6",
    "S7", "H7", "D7", "C7", "S8", "H8", "D8", "C8", "S9", "H9", "D9", "C9", "S10", "H10", "D10", "C10",
    "JS", "JH", "JD", "JC", "QS", "QH", "QD", "QC", "KS", "KH", "KD", "KC"];

// var cards = ["AS", "AH", "AD", "AC", "JS", "JH"];

var boardDeck = ["AS", "AH", "AD", "AC", "S2", "H2", "D2", "C2", "S3", "H3", "D3", "C3",
    "S4", "H4", "D4", "C4", "S5", "H5", "D5", "C5", "S6", "H6", "D6", "C6",
    "S7", "H7", "D7", "C7", "S8", "H8", "D8", "C8", "S9", "H9", "D9", "C9", "S10", "H10", "D10", "C10",
    "QS", "QH", "QD", "QC", "KS", "KH", "KD", "KC"];

// Double Decks
let doubleDeck = cards.concat(cards);
let boardDoubleDeck = boardDeck.concat(boardDeck);

// BoardCards

let boardCards = document.getElementById('board-cards');
let currentPlayer = 0;
let noOfTurns = 0;
const maxPlayers = 2;
const maxPlayerCards = 6;
var color = ["red", "blue", "green"];

showBoardCards = () => {
    let concat = 0
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            if ((x == 0 && y == 0) || (x == 9 && y == 0) || (x == 0 && y == 9) || (x == 9 && y == 9)) {
                let sli = document.createElement("li");
                sli.setAttribute('class', 'disabledelement');
                sli.setAttribute('data-x', x);
                sli.setAttribute('data-y', y);
                let div = document.createElement("div");
                div.setAttribute('class', 'empty-img');
                let simg = document.createElement("img");
                simg.setAttribute('src', 'src/cards/corner.png');
                div.appendChild(simg);
                sli.appendChild(div);
                boardCards.appendChild(sli);
            }
            else {
                let li = document.createElement("li");
                let img = document.createElement("img");
                li.setAttribute('class', 'disabledelement');
                li.setAttribute('data-x', x);
                li.setAttribute('data-y', y);
                li.setAttribute('id', concat);
                li.setAttribute('card', boardDoubleDeck[concat]);
                img.setAttribute('src', `src/cards/${boardDoubleDeck[concat]}.png`);
                li.appendChild(img);
                boardCards.appendChild(li);
                concat++
            }
        }
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

// let shuffled = shuffle(doubleDeck);
let shuffled = doubleDeck;
console.log("Shuffled", shuffled)

// Number of players and Cards distribution to each Player
let players = [];
let playerFunc = (maxPlayers, maxPlayerCards) => {
    for (let play = 0; play < maxPlayers; play++) {
        let playerCards = []
        let user = document.getElementById(`user${play}`);
        for (let i = 0; i < maxPlayerCards; i++) {
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
let discardCards = [];
playerFunc(maxPlayers, maxPlayerCards);
let player = {
    turn: true,
    color: color[currentPlayer],
    cards: players[currentPlayer]
}

let remaingDeck = shuffled;
console.log("Remaining Deck", remaingDeck);

// Switch Players 
switchPlayers = function () {
    currentPlayer = (noOfTurns % maxPlayers);
    player = {
        turn: true,
        color: color[currentPlayer],
        cards: players[currentPlayer]
    }
}

// Disable all Users Cards and Enable Active user
disableUsers = () => {
    let disables = document.querySelectorAll(".hand-cards ul");
    disables.forEach(disablesall => {
        disablesall.classList.add("disable-user")
    })
    document.getElementById(`user${currentPlayer}`).classList.remove("disable-user");
}

// Enable Board Cards According to Hand Cards
mappingFunction = (maped) => {
    let boardCardCheck = document.querySelectorAll(`#board-cards li[card=${maped}]`);
    let count = 0;
    boardCardCheck.forEach(selectedBoardCard => {
        if (selectedBoardCard.classList.contains('xhr') == false) {
            selectedBoardCard.classList.add('enable');
        }
        // For Dead Cards
        else {
            count++;
        }
        let handcard = document.querySelector(`#user${currentPlayer} #${maped}`);
        if (count > 0) {
            if (handcard.classList.contains("dead")) {
                handcard.classList.remove("dead")
                handcard.removeChild(handcard.children[2]);
                handcard.removeChild(handcard.children[1]);
            }
        }
        if (count >= 2) {
            handcard.classList.add("dead");
            let div = document.createElement("div");
            let divs = document.createElement("div");
            divs.setAttribute("class", "deadcard-icon");
            div.setAttribute("class", "deadcard");
            div.innerHTML = "Dead Card";
            handcard.appendChild(divs);
            handcard.appendChild(div);
        }
    });
}

// Disable All Cards
disableBoardCards = () => {
    let removeClass = document.querySelectorAll('#board-cards li');
    removeClass.forEach(removes => {
        removes.classList.remove('enable');
    });
}

// Enable Selected Cards 
enableSelectedCards = (id) => {
    if (id == "JD" || id == "JC") {
        let boardCardCheck = document.querySelectorAll(`#board-cards li`);
        boardCardCheck.forEach(selectedBoardCard => {
            if (!selectedBoardCard.className.includes('xhr') && !selectedBoardCard.className.includes('enable')) {
                selectedBoardCard.classList.add('enable');
            }
        });
    }
    else if (id == "JS" || id == "JH") {
        let boardCardCheck = document.querySelectorAll(`#board-cards li`);
        boardCardCheck.forEach(selectedBoardCard => {
            if (selectedBoardCard.className.includes('xhr') || selectedBoardCard.className.includes('enable')) {
                selectedBoardCard.classList.remove("xhr");
                selectedBoardCard.classList.add("enable");
            }
        });
    }
    else {
        let boardCardCheck = document.querySelectorAll(`#board-cards li[card=${id}]`);
        boardCardCheck.forEach(selectedBoardCard => {
            if (!selectedBoardCard.className.includes('xhr') && !selectedBoardCard.className.includes('enable')) {
                selectedBoardCard.classList.add('enable');
            }
        });
    }
}

// Reassign Hand Cards 
reassignPlayerCards = (id) => {
    let remaininghandcard = document.querySelectorAll(`#user${currentPlayer} li`);
    let count = 0;
    remaininghandcard.forEach(remaing => {
        if (count == 0) {  //For Avoid Removing Double Same ID Card from Hand Cards
            let remaingid = remaing.getAttribute("id");
            if (id == remaingid) {
                let user = document.getElementById(`user${currentPlayer}`);
                remaing.remove();
                if (remaingDeck.length > 0) {
                    let li = document.createElement("li");
                    li.setAttribute('id', remaingDeck[0]);
                    li.setAttribute('class', 'handcard');
                    let img = document.createElement("img");
                    img.setAttribute('src', `src/cards/${remaingDeck[0]}.png`);
                    player.cards.push(remaingDeck[0]);
                    remaingDeck.shift();
                    li.appendChild(img)
                    user.appendChild(li);
                }
                count++;
            }
        }
    });
}

// Discards Cards Function
discardCardsFunc = function () {
    let diss = discardCards[0];
    document.getElementById('disID').setAttribute("src", `src/cards/${diss}.png`);
}

// Check Winning Combinations
winningCombination = (cardinfo) => {
    let horizontal = cardinfo.getAttribute("data-x");
    let vertical = cardinfo.getAttribute("data-y");

    horizontalCombination = () => {
        let win = 0;
        if (vertical < 9) {
            for (let i = 1; i < 5; i++) {
                let checkIndex = parseInt(vertical) + i;
                if (checkIndex <= 9) {
                    let forward = document.querySelector(`.disabledelement[data-y="${checkIndex}"][data-x="${horizontal}"]`);
                    if ((forward.getAttribute('color')) && (forward.getAttribute("color") == player.color) && (forward.getAttribute("data-x") == horizontal)) {
                        win++;
                        console.log("Forward Cards Check", win)
                    }
                    else { break; }
                }
                else { break; }
            }
        }
        if (vertical > 0) {
            for (let i = 1; i < 5; i++) {
                let checkIndex = parseInt(vertical) - i;
                if (checkIndex >= 0) {
                    let previous = document.querySelector(`.disabledelement[data-y="${checkIndex}"][data-x="${horizontal}"]`);
                    if ((previous.getAttribute('color')) && (previous.getAttribute("color") == player.color) && (previous.getAttribute("data-x") == horizontal)) {
                        win++;
                        console.log("Previous Cards Check", win)
                    }
                    else { break; }
                }
                else { break; }
            }
        }
        if (win >= 3) {
            alert("You Won");
            return true;
        }
        else { return false; }
    }

    verticalCombination = () => {
        let win = 0;
        if (horizontal > 0) {
            for (let i = 1; i < 5; i++) {
                let checkIndex = parseInt(horizontal) - i;
                if (checkIndex >= 0) {
                    let previous = document.querySelector(`.disabledelement[data-x="${checkIndex}"][data-y="${vertical}"]`);
                    if ((previous.getAttribute('color')) && (previous.getAttribute("color") == player.color) && (previous.getAttribute("data-y") == vertical)) {
                        win++;
                        console.log("Horizontal Previous Cards Check", previous, win)
                    }
                    else { break; }
                }
                else { break; }
            }
        }
        if (horizontal < 9) {
            for (let i = 1; i < 5; i++) {
                let checkIndex = parseInt(horizontal) + i;
                if (checkIndex <= 9) {
                    let forward = document.querySelector(`.disabledelement[data-x="${checkIndex}"][data-y="${vertical}"]`);
                    if ((forward.getAttribute('color')) && (forward.getAttribute("color") == player.color) && (forward.getAttribute("data-y") == vertical)) {
                        win++;
                        console.log("Horizontal Forward Cards Check", forward, win)
                    }
                    else { break; }
                }
            }
        }
        if (win >= 3) {
            alert("You Won");
            return true;
        }
        else { return false; }
    }

    diagonalCombination = () => {
        let win = 0;
        if (horizontal > 0 && vertical > 0) {
            for (let i = 1; i < 5; i++) {
                let checkXIndex = parseInt(horizontal) - i;
                let checkYIndex = parseInt(vertical) - i;
                if (checkXIndex >= 0 && checkYIndex >= 0) {
                    let previous = document.querySelector(`.disabledelement[data-x="${checkXIndex}"][data-y="${checkYIndex}"]`);
                    if ((previous.getAttribute('color')) && (previous.getAttribute("color") == player.color)) {
                        win++;
                        console.log("Diagonal Combination Previous Cards Check", previous, win)
                    }
                }
                else { break; }
            }
        }

        if (horizontal < 9 && vertical < 9) {
            for (let i = 1; i < 5; i++) {
                let checkXIndex = parseInt(horizontal) + i;
                let checkYIndex = parseInt(vertical) + i;
                if (checkXIndex <= 9 && checkYIndex <= 9) {
                    let forward = document.querySelector(`.disabledelement[data-x="${checkXIndex}"][data-y="${checkYIndex}"]`);
                    if ((forward.getAttribute('color')) && (forward.getAttribute("color") == player.color)) {
                        win++;
                        console.log("Diagonal Combination Forward Cards Check", forward, win)
                    }
                }
                else { break; }
            }
        }
    }

    if (!horizontalCombination()) {
        if (!verticalCombination()) {
            diagonalCombination();
        }
    }

}

// Discard Cards
pushCard = (cardinfo, id) => {
    for (let i = 0; i <= player.cards.length; i++) {
        if (id == player.cards[i]) {
            discardCards.unshift(player.cards[i]);
            player.cards.splice(i, 1);
            reassignPlayerCards(id);
            break;
        }
    }
    winningCombination(cardinfo);
    noOfTurns++;
    discardCardsFunc();
    switchPlayers();
    matchHandWithBoardCards();
}
DeadpushCard = (id) => {
    for (let i = 0; i <= player.cards.length; i++) {
        if (id == player.cards[i]) {
            discardCards.unshift(player.cards[i]);
            player.cards.splice(i, 1);
            reassignPlayerCards(id);
            break;
        }
    }
    discardCardsFunc();
    matchHandWithBoardCards();
}

// Match Clicked Hand Card with board Cards
clickHandwithBoard = () => {
    let handcardClickRemover = document.querySelectorAll(`.handcard`);
    for (var i = 0; i < handcardClickRemover.length; i++) {
        handcardClickRemover[i].removeEventListener('click', handcardClickFunction);
    }
    let handcardClick = document.querySelectorAll(`#user${currentPlayer} .handcard`);
    for (var i = 0; i < handcardClick.length; i++) {
        handcardClick[i].addEventListener('click', handcardClickFunction);
    }
}

handcardClickFunction = function () {
    let id = this.getAttribute("id");
    let deadcard = this.classList.contains("dead");
    if (deadcard) {
        DeadpushCard(id);
    }
    else {
        clickHandwithBoard();
        this.removeEventListener('click', handcardClickFunction);

        //Disable All Cards
        disableBoardCards();

        // Enable Selected Cards 
        enableSelectedCards(id);

        // Board Cards Click
        let enableCards = document.querySelectorAll('#board-cards .enable');
        let enableCardsRemove = document.querySelectorAll('#board-cards li');

        boadCardClick = function () {
            let cardinfo = this;
            enableCards.forEach(enables => {
                enables.classList.remove('enable');
            });

            // For Single Eyed Jack Cards
            if (id == "JS" || id == "JH") {
                this.classList.remove(color[0], color[1], color[2], "xhr");
                this.removeAttribute('color', player.color);
                enableCardsRemove.forEach(adding => {
                    let a = adding.hasAttribute("color");
                    if (a === true) { adding.classList.add("xhr"); }
                });
            }
            else {
                this.classList.add(player.color, "xhr");
                this.setAttribute('color', player.color);
            }
            this.removeEventListener('click', handcardClickFunction);
            console.log("Click element", discardCards, player.cards, currentPlayer);
            this.classList.remove("enable");
            pushCard(cardinfo, id);
            for (var i = 0; i < enableCardsRemove.length; i++) {
                enableCardsRemove[i].removeEventListener('click', boadCardClick);
            }
        }

        for (var i = 0; i < enableCardsRemove.length; i++) {
            enableCardsRemove[i].removeEventListener('click', boadCardClick);
        }

        for (var i = 0; i < enableCards.length; i++) {
            enableCards[i].addEventListener('click', boadCardClick);
        }
    }

}

// Draw Game
drawGame = () => {
    if (remaingDeck.length == 0) {
        let count = 0;
        for (i = 0; i < maxPlayers; i++) {
            let userHandCards = document.querySelectorAll(`#user${i} li`);
            console.log("HAND Cards length asdfsadfsd", userHandCards);
            if (userHandCards.length == 0) {
                count++;
            }
            if (count == maxPlayers) {
                alert("Game Draw");
            }
        }
    }
}

// Match Hand Cards with Board Cards
matchHandWithBoardCards = function () {
    disableUsers();
    drawGame();
    player.cards.map(mappingFunction);
    clickHandwithBoard();
}

function start() {
    showBoardCards();
    matchHandWithBoardCards();
}

window.onload = start();

