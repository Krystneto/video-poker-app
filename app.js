const _ = require('lodash');
// const shuffle = require('shuffle-array');

// Building deck array

const cardNames = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace'];

const cardSuits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];

const createDeck = 
    cardNames => 
        cardSuits => 
            cardNames.map(x => 
                cardSuits.map( (y, j) => 
                    Object.assign({}, { value: j+1, suit: x, name: y })));


const deck = _.flatten(createDeck(cardSuits)(cardNames));

const shuffledDeck = _.shuffle(deck);

const dealFiveCards = shuffleDeck => shuffledDeck.slice(0,5);

const dealtHand = dealFiveCards(shuffledDeck);


// test functions for winning hands
function countInArray(array, value) {
    return array.reduce((n, x) => n + (x === value), 0);
}

const isPair = hand => {
    return _.uniqBy(hand, 'value').length === 4 ? true : false ;
}

const isTwoPair = hand => {
    let sortArr = _.map(hand, 'value')
        .map((x,i,arr) => countInArray(arr, x));
    return (_.uniqBy(sortArr).length === 2) ? true : false;
}

const isThreeOfKind = hand => {
    let sortArr = _.map(hand, 'value')
        .map((x,i,arr) => countInArray(arr, x));
    return (sortArr.includes(3)) ? true : false;
}

// const isStraight = hand => {

// }

const isFlush = hand => {
    return _.uniqBy(hand, 'suit').length === 1 ? true : false; 
}

const isFourOfKind = hand => {
    let sortArr = _.map(hand, 'value')
        .map((x,i,arr) => countInArray(arr, x));
    return (sortArr.includes(4)) ? true : false;
}

const isWinningHand = hand => {
    if (isFourOfKind(hand)) {
        return 'You have a four of a kind';
    }
    if (isFlush(hand)) {
        return 'You have a flush!';
    }
    if (isThreeOfKind(hand)) {
        return 'You have a three of a kind!';
    }
    if (isTwoPair(hand)) {
        return 'You have two pair!';
    }
    if (isPair(hand)) {
        return 'You have a pair!';
    }

    return 'Still calculating';

}


// test stub objects for checking winning hands
const pairHand = _.times(2, _.constant({ value: 3 })).concat({ value: 1}, { value: 2}, { value: 4})
const threeOfKindHand = _.times(3, _.constant({ value: 3, suit: 'Hearts' })).concat({ value: 2, suit: 'Diamonds'}, { value: 6, suit: 'Clubs' })
const twoPairHand = _.times(2, _.constant({ value: 3, suit: 'Hearts' })).concat({ value: 1, suit: 'Spades'}, { value: 1, suit: 'Clubs'}, { value: 4, suit: 'Diamonds'})
const flushHand = _.times(5, _.constant({ suit: 'Hearts' }))
const fourOfKindHand = _.times(4, _.constant({ value: 3 })).concat({ value: 1 })


// console.log(threeOfKindHand)

// console.log(isPair(pairHand))
// console.log(isTwoPair(twoPairHand))
// console.log(isThreeOfKind(threeOfKindHand))
// console.log(isFourOfKind(fourOfKindHand))
// console.log(isFlush(threeOfKindHand))
// console.log(isFlush(dealtHand))

console.log('hand', dealtHand)
console.log(isWinningHand(dealtHand))









































