function countOddEven (arr){
  var countOdd = 0;
  var countEven = 0;
  var countZero = 0;
  for (val of arr) {
    if (typeof val === "number") {
      if (val === 0) {
        countZero++;
      } else if (val % 2 === 0) {
        countEven++;
      } else {
        countOdd++;
      }
    }
  }
  return [countEven, countOdd, countZero];
}
module.exports = countOddEven;


