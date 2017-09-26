'use strict'

// Building deck array
const cardNames = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
const cardSuits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];

// function to create a 52 playing card deck   
const createDeck = 
    cardNames => 
        cardSuits => 
            cardNames.map(x => 
                cardSuits.map( (y, j) => 
                    Object.assign({}, { 
                        value: j+1, 
                        suit: x, 
                        name: y, 
                        image_url: `/assets/playing_cards/${y.toLowerCase()}_of_${x.toLowerCase()}.png` 
                    })
                )
            );

// A new 52 card deck
const deck = _.flatten(createDeck(cardSuits)(cardNames));

// function to shuffle the deck
const shuffledDeck = _.shuffle(deck);

// function to deal the first five cards from the deck
const dealFiveCards = shuffleDeck => shuffledDeck.slice(0,5);
const remainingDeck = shuffleDeck => shuffledDeck.slice(5);

const dealtHand = dealFiveCards(shuffledDeck);
const deckRemainder = remainingDeck(shuffledDeck);

// test functions for winning hands
function countInArray(array, value) {
    return array.reduce((n, x) => n + (x === value), 0);
}

const isPair = hand => {
    if (_.uniqBy(hand, 'value').length === 4) {
        return true;
    }
    return false;
}

const isTwoPair = hand => {
    if (_.uniqBy(hand, 'value').length === 3) {
        return true;
    }
    return false;
}

const isThreeOfKind = hand => {
            let sortArr = _.map(hand, 'value')
                .map((x,i,arr) => countInArray(arr, x));
            
            if (sortArr.includes(3)) {
                return true;
            }
            return false;
        }

const isStraight = hand => {
    let sortArr = _.sortBy(_.map(hand, 'value'));
    let filteredSortArrLength = (_.filter(sortArr, (x, i, arr) => (arr[i] - arr[i-1]) === 1 )).length;
    
    if (filteredSortArrLength === 4) {
        return true;
    } 
    return false;
}

const isFlush = hand => {
    if (_.uniqBy(hand, 'suit').length === 1) {
        return true;
    } 
    return false;
}


const isFullHouse = hand => {
            if (isThreeOfKind(hand) && (_.uniqBy(hand, 'value').length === 2)) {
                return true;
            }
            return false;
        };


const isFourOfKind = hand => {
            const sortArr = _.map(hand, 'value')
                .map((x,i,arr) => countInArray(arr, x));
        
            if (sortArr.includes(4)) {
                return true;
            }
            return false;
        }

const isStraightFlush = hand => {
                if (isStraight(hand) && isFlush(hand)) {
                    return true;
                }
                return false;
            }


const isRoyalFlush = hand =>  {
            let cardValueTotal = _.sortBy(_.map(hand, 'value')).reduce((a, b) => a + b );
            if (isFlush(hand) && cardValueTotal === 60) {
                return true;
            }
            return false;
        };


// function to check if the hand is a winner
const isWinningHand = (hand) => {
    if (isRoyalFlush(hand)) {
        return 'You have a Royal Flush';
    }

    if (isStraightFlush(hand)) {
        return 'You have a Straight Flush!';
    }

    if (isFourOfKind(hand)) {
        return 'You have a Four of a Kind!';
    }

    if (isFullHouse(hand)) {
        return 'You have a Fullhouse!';
    }

    if (isFlush(hand)) {
        return 'You have a Flush!';
    }

    if (isStraight(hand)) {
        return 'You have a Straight!';
    }

    if (isThreeOfKind(hand)) {
        return 'You have a Three of a Kind!';
    }

    if (isTwoPair(hand)) {
        return 'You have Two Pair!';
    }

    if (isPair(hand)) {
        return 'You have a Pair!';
    }

    return 'Not a winner!';

}


// test stub objects for checking winning hands
const pairHand = _.times(2, _.constant({ value: 3, suit: 'Spades' })).concat({ value: 1, suit: 'Clubs'}, { value: 2, suit: 'Clubs'}, { value: 4, suit: 'Hearts'})
const threeOfKindHand = _.times(3, _.constant({ value: 3, suit: 'Hearts' })).concat({ value: 2, suit: 'Diamonds'}, { value: 6, suit: 'Clubs' })
const twoPairHand = _.times(2, _.constant({ value: 3, suit: 'Hearts' })).concat({ value: 1, suit: 'Spades'}, { value: 1, suit: 'Clubs'}, { value: 4, suit: 'Diamonds'})
const straightHand = [{ value: 1, suit: 'Clubs'}, { value: 2, suit: 'Hearts' }, { value: 3, suit: 'Spades' }, { value: 4, suit: 'Hearts' }, { value: 5, suit: 'Clubs' }]
const flushHand = _.times(5, _.constant({ suit: 'Hearts' }))
const fullHouseHand = _.times(3, _.constant({ value: 3, suit: 'Hearts' })).concat({ value: 2, suit: 'Diamonds'}, { value: 2, suit: 'Clubs' })
const fourOfKindHand = _.times(4, _.constant({ value: 3 })).concat({ value: 1 })
const straightFlushHand = [{ value: 1, suit: 'Clubs'}, { value: 2, suit: 'Clubs' }, { value: 3, suit: 'Clubs' }, { value: 4, suit: 'Clubs' }, { value: 5, suit: 'Clubs' }]
const royalFlushHand = [{ value: 10, suit: 'Clubs'}, { value: 11, suit: 'Clubs' }, { value: 12, suit: 'Clubs' }, { value: 13, suit: 'Clubs' }, { value: 14, suit: 'Clubs' }]


console.log('hand', dealtHand)
console.log(isWinningHand(dealtHand))
