function displayObject(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty) {
            console.log("key: " + key + " property: " + obj.key);
        }
    }
}
module.exports = displayObject;