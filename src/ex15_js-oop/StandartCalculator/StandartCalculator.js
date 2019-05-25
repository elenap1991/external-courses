function Calculator() {
  this.stored = 0;
}

Calculator.prototype.validateAndApply = function (val, func) {
  if (isFinite(val)) {
    this.stored = func(val);
  }
  return this;
};

Calculator.prototype.add = function (arg) {
  return this.validateAndApply(arg, val => this.stored + val);
};

Calculator.prototype.subtract = function (arg) {
  return this.validateAndApply(arg, val => this.stored - val);
};

Calculator.prototype.divide = function (arg) {
  return this.validateAndApply(arg, val => val !== 0 ? this.stored / val : NaN);
};

Calculator.prototype.multiply = function (arg) {
  return this.validateAndApply(arg, val => this.stored * val);
};

Calculator.prototype.getResult = function () {
  return this.stored;
};

Calculator.prototype.reset = function () {
  this.stored = 0;
  return this;
};
Calculator.prototype.setState = function (arg) {
  return this.validateAndApply(arg, val => val);
};
Calculator.prototype.fetchData = function (callback) {
  setTimeout(() => callback(500));
};

module.exports = Calculator;