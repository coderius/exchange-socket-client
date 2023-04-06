// statisticComputeHelper.js
//--------------------------------------------------------------------------------
//Helpers
//--------------------------------------------------------------------------------
export function computeMin(array) {
    let item = array.reduce((prev, curr) => prev.value < curr.value ? prev : curr);
    return item.value;
}

export function computeMax(array) {
    let item = array.reduce((prev, curr) => prev.value > curr.value ? prev : curr);
    return item.value;
}

export function currentDateTime() {
    return new Date();
}

//Set new Date()
export function getFullDate(date) {

    return date.getDate() + "/"
        + (date.getMonth() + 1) + "/"
        + date.getFullYear() + " @ "
        + date.getHours() + ":"
        + date.getMinutes() + ":"
        + date.getSeconds();

}

//Set start = Date()
export function computeTime(start) {
    return (new Date() - start) / 1000; //seconds;
}

export function arithmeticMean(array) {
    // return array.reduce((partial_sum, a) => partial_sum.value + a.value, 0) / array.length;
    var sum = 0;
    for (var i = 0; i < array.length; i++) {
        sum += array[i].value;
    }
    return sum / array.length;
}

export function standardDeviation(array) {
    var i,
        j,
        total = 0,
        mean = 0,
        diffSqredArr = [];

    for (i = 0; i < array.length; i += 1) {
        total += array[i].value;
    }

    mean = total / array.length;

    for (j = 0; j < array.length; j += 1) {
        diffSqredArr.push(Math.pow((array[j].value - mean), 2));
    }
    return (Math.sqrt(diffSqredArr.reduce(function (firstEl, nextEl) {
        return firstEl + nextEl;
    }) / array.length));


}

export function countLostExchanges(array) {
    const emptyValues = ["", null];
    return Object.values(array).reduce((r, c) => r + emptyValues.includes(c.value), 0);
}

export function getMode(array, copies) {
    var reformattedArray = array.map(({ key, value }) => (value))
    array = reformattedArray;
    let map = new Map();
    for (let elem of array) {
        let counter = map.get(elem);
        map.set(elem, counter ? counter + 1 : 1);
    }
    let res = [];
    for (let [elem, counter] of map.entries())
        if (counter >= copies)
            res.push(elem);
    return res;
}
