var funcTupeDefinition = function (variable){
    if (typeof variable == 'string'){
        return 'string';
    } else if (typeof variable == 'number') {
        return 'number';
    }else{
        variable = undefined;
        return variable;
    }
}
