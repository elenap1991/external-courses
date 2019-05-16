function mySome(array, callback) {
    for (i = 0; i < array.length; i++){
        if (callback(array[i], i, array)) { return true }
    }
    return false;
};
module.exports = mySome;
