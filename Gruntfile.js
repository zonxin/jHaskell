module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        build:{
            compile:{ src:["src/jHaskell.js"],dest:"dest/jHaskell.js"}
        },
        jshint:{
            beforecompile:["src/**/*.js","!src/intro.js","!src/outro.js"],
            aftercompile:["dest/jHaskell.js"],
            options:{
                validthis:true,evil:true
            }
        },
        uglify:{
            options:{
                banner:'/*! <%= pkg.name %>\n * author:<%= pkg.author %>\n * released license:<%= pkg.license %> \n */',
                sourceMap: true,
                sourceMapName: "dest/jHaskell.min.map"
            },
            complie:{
                files:[{src:['dest/jHaskell.js'],dest:"dest/jHaskell.min.js"} ]
            }
        }
    });
    // load task
    grunt.loadTasks('./build');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // 默认被执行的任务列表。
    grunt.registerTask('default', ['jshint:beforecompile','build','jshint:aftercompile','uglify']);
};




