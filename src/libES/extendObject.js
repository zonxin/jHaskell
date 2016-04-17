define([
    './isFunction.js',
    './isPainObject.js',
    './var/isArray.js',
    './var/hasOwn.js'
],function(isFunction,isPlainObject,isArray,hasOwn){
    function extendObject() {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if ( typeof target === "boolean" ) {
            deep = target;
            // Skip the boolean and the target
            target = arguments[ i ] || {};
            i++;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if ( typeof target !== "object" && !isFunction(target) ) {
            target = {};
        }

        // Extend this itself if only one argument is passed
        if ( i === length ) {
            target = this;
            i--;
        }

        for ( ; i < length; i++ ) {
            // Only deal with non-null/undefined values
            if ( (options = arguments[ i ]) !== null ) {
                // Extend the base object
                for ( name in options ) {
                    if(!hasOwn.call(options,name)) { continue; }
                    src = target[name];
                    copy = options[name];
                    // Prevent never-ending loop
                    if ( target === copy ) { continue; }
                    // Recurse if we're merging plain objects or arrays
                    if ( deep && copy && ( isPlainObject(copy) || (copyIsArray = isArray(copy)) ) ) {
                        if ( copyIsArray ) {
                            copyIsArray = false;
                            clone = src && isArray(src) ? src : [];
                        } else {
                            clone = src && isPlainObject(src) ? src : {};
                        }
                        // Never move original objects, clone them
                        target[name] = extendObject(deep,clone,copy );
                    // Don't bring in undefined values
                    } else if ( copy !== undefined ) {
                        target[name] = copy;
                    }
                }
            }
        }
        // Return the modified object
        return target;
    }
    return extendObject;
});
