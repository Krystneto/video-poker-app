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

const isThreeOfKind = 
    hand => 
        countInArray => {
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


const isFullHouse = 
    hand => 
        isThreeOfKind => {
            if (isThreeOfKind(hand) && (_.uniqBy(hand, 'value').length === 2)) {
                return true;
            }
            return false;
        };


const isFourOfKind = 
    hand => 
        countInArray => {
            const sortArr = _.map(hand, 'value')
                .map((x,i,arr) => countInArray(arr, x));
        
            if (sortArr.includes(4)) {
                return true;
            }
            return false;
        }

const isStraightFlush =
    hand => 
        isStraight =>
            isFlush => {
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

        
module.exports = {
    isPair,
    isTwoPair,
    isThreeOfKind,
    isStraight,
    isFlush,
    isFullHouse,
    isFourOfKind,
    isStraightFlush,
    isRoyalFlush
}