function deepClone(obj) {
    var objCopy;
    if (Array.isArray(obj)) {
        objCopy = [];
    } else {
        objCopy = {};
    }
    for (key in obj) {
        if (typeof obj[key] === "object") {
            objCopy[key] = deepClone(obj[key]);
        } else {
            objCopy[key] = obj[key];
        }
    }
    return objCopy;
}
module.exports = deepClone;
