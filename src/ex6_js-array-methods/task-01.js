function myslice(array, begin, end) {
    var beginFunc = begin;
    var endFunc = end;
    var newArray = [];
    if (endFunc === undefined || endFunc > array.length) {
        endFunc = array.length;
    } else if (endFunc < 0) {
        endFunc += array.length;
    }
    if (beginFunc === undefined) {
        beginFunc = 0;
    } else if (beginFunc < 0) {
        beginFunc += array.length;
    }
    for (i = beginFunc; i < endFunc; i++){
        newArray.push(array[i]);
    }
    return newArray;
}
module.exports = myslice;
