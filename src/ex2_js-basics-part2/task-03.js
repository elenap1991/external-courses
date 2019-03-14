function countOddEven (arr){
  var countOdd, countEven, countZero;
  countOdd = countEven = countZero = 0;
  for (var i = 0 ; i < arr.length ; i++) {
    if (typeof arr[i] === "number") {
      if (arr[i] === 0) {
        countZero++;
      } else if (arr[i] % 2 === 0) {
        countEven++;
      } else {
        countOdd++;
      }
    }
  }
  return [countEven, countOdd, countZero];
}
module.exports = countOddEven;
console.log(countOddEven([1,2,0,0,4]))

