const Calculator = require('../StandartCalculator/StandartCalculator.js');
var AccountingCalculator = function () {
  Calculator.call(this);
}
AccountingCalculator.prototype = Object.create(Calculator.prototype);
AccountingCalculator.prototype.constructor = AccountingCalculator;

AccountingCalculator.prototype.addPercent = function (arg) {
  return this.validateAndApply(arg, val => this.stored * (1 + val / 100));
};

AccountingCalculator.prototype.subtractPercent = function (arg) {
  return this.validateAndApply(arg, val => this.stored * (1 - val / 100));
};

AccountingCalculator.prototype.retrieveTax = function () {
  var tmpStored = this.stored;
  this.stored = tmpStored - Math.round(Math.abs(tmpStored / 1.20 - tmpStored) * 100) / 100;
  return this;
};

AccountingCalculator.prototype.chargeTax = function () {
  this.stored = this.stored + this.stored * 0.2;
  return this;
};

module.exports = AccountingCalculator;
