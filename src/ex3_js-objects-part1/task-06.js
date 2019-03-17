function deepClone(obj) {
    var objCopy = Object.create(Object.getPrototypeOf(obj));
    if (Array.isArray(obj)) {
        for (var i = 0; i < obj.length; i++) {
            if (typeof obj[i] === "object") {
                objCopy[i] = deepClone(obj[i]);
            } else {
                objCopy[i] = obj[i];
            }
        }
    } else {
        for (key in obj) {
            if (typeof obj[key] === "object") {
                objCopy[key] = deepClone(obj[key]);
            } else {
                objCopy[key] = obj[key];
            }
        }
    }
    return objCopy;
}
module.exports = deepClone;
