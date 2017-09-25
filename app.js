const _ = require('lodash');
const shuffle = require('shuffle-array');

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

const shuffledDeck = shuffle(deck);

const dealFiveCards = shuffleDeck => shuffledDeck.slice(0,5);

const hand = dealFiveCards(shuffledDeck);

// test stub objects for checking winning hands
const flushHand = _.times(5, _.constant({ suit: 'Hearts' }))

// test functions for winning hands
const isPair = hand => 
    _.uniqBy(hand, 'value').length === 4 ? true : false 

// const isTwoPair = hand =>
//     _.uniqBy(hand, 'value').length === 3 &&  ? true : false 

const isThreeOfKind = hand => 
    _.uniqBy(hand, 'value').length === 3 ? true : false 
    
const isFlush = hand => 
    _.uniqBy(hand, 'suit').length === 1 ? true : false 



console.log('hand', hand)
console.log(isPair(hand))
console.log(isThreeOfKind(hand))
console.log(isFlush(flushHand))
















