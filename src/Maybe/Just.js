define([
    './Maybe.js'
],function(Maybe){
    function Just(value)
    {
        return new Maybe(value);
    }
    return Just;
});
