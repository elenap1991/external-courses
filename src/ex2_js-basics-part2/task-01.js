function typeDefinition (variable){
    if ((typeof variable === 'string') || (typeof variable === 'number')) {
        return typeof variable;
    }
    return undefined;
}
module.exports = typeDefinition;

