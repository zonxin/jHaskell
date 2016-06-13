module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        build:{
            compile:{ src:["src/jHaskell.js"],dest:"dest/jHaskell.js"},
            Trans:{
                options:{ wrap: { startFile: "src/Control/Monad/Trans/intro.js", endFile: [ "src/Control/Monad/Trans/outro.js" ] } },
                src:["src/Control/Monad/Trans/Trans.js"],
                dest:"dest/jHaskell.Control.Monad.Trans.js"
            }
        },
        jshint:{
            beforecompile:["src/**/*.js","!src/**/intro.js","!src/**/outro.js"],
            aftercompile:["dest/jHaskell.js","dest/jHaskell.Control.Monad.Trans.js"],
            options:{
                validthis:true,evil:true
            }
        },
        uglify:{
            options:{
                banner:'/*! <%= pkg.name %>\n * author:<%= pkg.author %>\n * released license:<%= pkg.license %> \n */',
                sourceMap: true
            },
            complie:{
                files:[{src:['dest/jHaskell.js'],dest:"dest/jHaskell.min.js"} ]
            },
            Trans:{
                files:[{
                    src:["dest/jHaskell.Control.Monad.Trans.js"],
                    dest:"dest/jHaskell.Control.Monad.Trans.min.js"
                }]
            }
        },
        watch:{
            options:{
                livereload: 9001
            },
            jHaskell:{
                files:['src/**/*.js','test/**/*.html'],
                tasks:['default']
            }
        },
        "http-server": {
            jHaskell:{
                port: 9000,
                host: "0.0.0.0"
            }
        }
    });
    // load task
    grunt.loadTasks('./build');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-http-server');
    // 默认被执行的任务列表。
    grunt.registerTask('default', ['jshint:beforecompile','build','jshint:aftercompile','uglify']);
};




