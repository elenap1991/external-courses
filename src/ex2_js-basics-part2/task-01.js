var funcTupeDefinition = function (variable){
    if ((typeof variable == "string") || (typeof variable == "number")){
        return typeof variable;
    }else{
        return "undefined";
    }
}
