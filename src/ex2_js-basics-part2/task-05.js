function maxValueInArr(arr) {
    var tmp = arr[0];
    for (var i = 1; i < arr.length; i++){
        if (arr[i] > tmp) {
            tmp = arr[i];
        }
    }
    return tmp;
}
module.exports = maxValueInArr;