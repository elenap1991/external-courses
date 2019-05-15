function myReduce(array, callback, initialValue) {
    var start, prevValue;
    if (!initialValue) {
        start = 1;
        prevValue = array[0];
    } else {
        start = 0;
        prevValue = initialValue;
    }
    for (i = start; i < array.length; i++){
        prevValue = callback( prevValue, array[i], i, array);
    }
    return prevValue;
}
module.exports = myReduce;
