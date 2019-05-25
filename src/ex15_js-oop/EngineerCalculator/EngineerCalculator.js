const Calculator = require('../StandartCalculator/StandartCalculator.js');
var EngineerCalculator = function () {
  Calculator.call(this);
}
EngineerCalculator.prototype = Object.create(Calculator.prototype);
EngineerCalculator.prototype.constructor = EngineerCalculator;

EngineerCalculator.prototype.pow = function (arg) {
  return this.validateAndApply(arg, val => Math.pow(this.stored, val));
};

EngineerCalculator.prototype.sqrt = function () {
  this.stored = Math.sqrt(this.stored);
  return this;
};

EngineerCalculator.prototype.ln = function () {
  this.stored = Math.log(this.stored);
  return this;
};

EngineerCalculator.prototype.log10 = function () {
  this.stored = Math.log10(this.stored);
  return this;
};

EngineerCalculator.prototype.sinRad = function () {
  this.stored = Math.sin(this.stored);
  return this;
};

EngineerCalculator.prototype.cosRad = function () {
  this.stored = Math.cos(this.stored);
  return this;
};

module.exports = EngineerCalculator;