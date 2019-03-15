function deepClone(obj) {
    var clone;
    if (Array.isArray(obj)) {
        clone = [];
    } else {
         clone = {};
    }
    for (key in obj) {
        if (typeof obj[key] === "object") {
            clone[key] = deepClone(obj[key]);
        } else {
            clone[key] = obj[key];
        }
    }
    return clone;
}