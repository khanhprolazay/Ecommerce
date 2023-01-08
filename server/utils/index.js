const isEmptyObject = (object) => {
    return !Object.keys(object).length;
}

const sortByDateValue = (array, value) => {
    return array.sort(function(a, b) {
        return new Date(b["value"][value]) - new Date(a["value"][value]);
    })
}

const sortByNumberValue = (array, value) => {
    return array.sort(function(a, b) {
        return  b["value"][value] - a["value"][value];
    })
}

module.exports = { isEmptyObject, sortByDateValue, sortByNumberValue };