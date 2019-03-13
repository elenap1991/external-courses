function isCongruent(arr) {
    const tmp = arr[0];
    for (var i = 1 ; i < arr.length ; i++){
        if (arr[i] !== tmp){
            return false;
        }
    }
    return true;
}
module.exports = isCongruent;