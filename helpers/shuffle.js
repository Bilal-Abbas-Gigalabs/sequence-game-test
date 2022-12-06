// Shuffle
const shuffle = (doublecards) => {
    const arr_val = doublecards;
    for (let ar = 0; ar < arr_val.length; ar++) {
        let j = parseInt(Math.random() * arr_val.length);
        let temp = arr_val[ar];
        arr_val[ar] = arr_val[j];
        arr_val[j] = temp;
    }
    return arr_val;
}

module.exports = shuffle(doublecards);