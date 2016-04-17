/*
 *
 * Copyright (c) 2015 zonxin
 * Licensed under the MIT license.
 */

'use strict';

/* see: jquery convert function https://github.com/jquery/jquery/blob/master/build/tasks/build.js*/
function convert( name, path, contents ) {
    var amdName;
    var rdefineEnd = /\}\s*?\);[^}\w]*$/;
    // Convert var modules
    if ( /.\/var\//.test( path ) ) {
        contents = contents
            .replace( /define\([\w\W]*?\{([\w\W]*?)return/, "$1var " + (/var\/([\w-]+)/.exec(name)[1]) + " =" )
            .replace( rdefineEnd, "" );
    } else if( /.\/globalArg\//.test(path) ){
        contents = "";
    } else {

        contents = contents
            .replace( /\s*return\s+[^\}]+(\}\s*?\);[^\w\}]*)$/, "$1" )
            // Multiple exports
            .replace( /\s*exports\.\w+\s*=\s*\w+;/g, "" );

        // Remove define wrappers, closure ends, and empty declarations
        contents = contents
            .replace( /define\([^{]*?{/, "" )
            .replace( rdefineEnd, "" );

        // Remove anything wrapped with
        // /* ExcludeStart */ /* ExcludeEnd */
        // or a single line directly after a // BuildExclude comment
        contents = contents
            .replace( /\/\*\s*ExcludeStart\s*\*\/[\w\W]*?\/\*\s*ExcludeEnd\s*\*\//ig, "" )
            .replace( /\/\/\s*BuildExclude\n\r?[\w\W]*?\n\r?/ig, "" );

        // Remove empty definitions
        contents = contents
            .replace( /define\(\[[^\]]*\]\)[\W\n]+$/, "" );
    }
    return contents;
}

var requirejs = require("requirejs");
var path = require("path");
module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('build', 'remove define() like jquery', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var done = this.async();
    grunt.log.writeln("building...");
    var options = this.options({
        baseUrl: "src",
        name: "main",
        out: "dist/main.js",
        // We have multiple minify steps
        optimize: "none",
        // Include dependencies loaded with require
        findNestedDependencies: true,
        // Avoid inserting define() placeholder
        skipModuleInsertion: true,
        // Avoid breaking semicolons inserted by r.js
        skipSemiColonInsertion: true,
        wrap: {
            startFile: "src/intro.js",
            endFile: [ "src/exports.js","src/outro.js" ]
        },
        onBuildWrite: convert
    });

        var baseUrl = path.resolve(options.baseUrl);
        var src = path.resolve(this.files[0].src[0]);
        options.name = path.relative(baseUrl,src).replace(/\.js$/,"");
        options.out = this.files[0].dest;
        requirejs.optimize( options, function( response ) {
            grunt.verbose.writeln( response );
            done();
        }, function( err ) {
            done( err );
        });
      // Print a success message.
      grunt.log.writeln('File "' + this.files[0].dest + '" created.');
  });

};
