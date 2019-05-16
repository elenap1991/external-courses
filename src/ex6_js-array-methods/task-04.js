function myFilter(array, callback) {
    var newArray = [];
    for (i = 0; i < array.length; i++){
        if (callback(array[i], i, array)) newArray.push(array[i]);
    }
    return newArray;
};
module.exports = myFilter;
