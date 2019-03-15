function createProperty(prop, obj) {
    var modObj = obj;
    if (!(prop in obj)){
        modObj[prop] = "new";
    }
    return modObj;
}
module.exports = createProperty;