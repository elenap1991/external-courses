function typeDefinition (variable){
    if (typeof variable === 'string' || typeof variable === 'number' && !Number.isNaN(variable)) {
        return typeof variable;
    }
    return undefined;
}
module.exports = typeDefinition;
