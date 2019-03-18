function checkPrimality (variable){
    if (variable > 1000 || variable <= 1) {
        return "Данные неверны";
    }
    for (var i = 2; i <= Math.sqrt(variable); i++) {
        if (variable % i === 0) {
            return ("Число " + variable + " - составное число");
        }
    }
    return ("Число " + variable + " - простое число");
}
module.exports = checkPrimality;
