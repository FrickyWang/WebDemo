module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-concat'); //js文件合并
  grunt.loadNpmTasks('grunt-contrib-jshint'); //js代码检查
  grunt.loadNpmTasks('grunt-contrib-uglify'); //js文件压缩
  grunt.loadNpmTasks('grunt-contrib-clean');  //文件删除
  grunt.loadNpmTasks('grunt-contrib-copy');   //文件拷贝
  grunt.loadNpmTasks('grunt-contrib-requirejs');   //文件拷贝
  /*grunt.loadNpmTasks('grunt-contrib-watch');  // 文件监视
  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-html2js');*/

  // Default task.
  //grunt.registerTask('default', ['jshint','build','karma:unit']);
  //grunt.registerTask('build', ['clean','html2js','concat','recess:build','copy:assets']);
  grunt.registerTask('build', ['clean:cleanAll','requirejs','concat:appJs','copy','clean:cleanTemp']);
  //grunt.registerTask('build', ['clean:cleanAll','requirejs','concat','copy']);
  //grunt.registerTask('a', ['requirejs']);
  //grunt.registerTask('release', ['clean','html2js','uglify','jshint','karma:unit','concat:index', 'recess:min','copy:assets']);
  //grunt.registerTask('test-watch', ['karma:watch']);

  // Print a timestamp (useful for when watching)
  grunt.registerTask('timestamp', function() {
    grunt.log.subhead(Date());
  });
  
  var requirejsModules = [];
  //grunt.file.expand({cwd:'<%= distdir %>/static'},'**/*.js');
  /*var karmaConfig = function(configFile, customOptions) {
    var options = { configFile: configFile, keepalive: true };
    var travisOptions = process.env.TRAVIS && { browsers: ['Firefox'], reporters: 'dots' };
    return grunt.util._.extend(options, customOptions, travisOptions);
  };*/

  // Project configuration.
  grunt.initConfig({
    distdir: 'dist',
    pkg: grunt.file.readJSON('package.json'),
    banner:
    '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
    '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
    ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;\n */\n',
    //' * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n */\n',
    src: {
      //js: ['src/**/*.js'],
      //jsTpl: ['<%= distdir %>/templates/**/*.js'],
      //specs: ['test/**/*.spec.js'],
      //scenarios: ['test/**/*.scenario.js'],
      //html: ['src/index.html'],
      //tpl: {
       // app: ['src/app/**/*.tpl.html'],
        //common: ['src/common/**/*.tpl.html']
      //},
      //less: ['src/less/stylesheet.less'], // recess:build doesn't accept ** in its file patterns
      //lessWatch: ['src/less/**/*.less']
      //staticJsCss : ['vendor/*']
    },
    clean: {
      cleanAll : ['<%= distdir %>/*'],
      cleanTemp : ['src/app/temp']
    },
    copy: {
      staticJsCss: {
        files: [{ dest: '<%= distdir %>/static/tp', src : '**', expand: true, cwd: 'vendor' }]
      },
      appCss: {
        files: [{ dest: '<%= distdir %>/static/styles', src : '**', expand: true, cwd: 'src/css' }]
      },
      indexhtml: {
        files: [{ dest: '<%= distdir %>', src : 'index.html', expand: true, cwd: 'src' }]
      },
      appJs: {
        files: [{ dest: '<%= distdir %>/static/scripts', src : 'index.js', expand: true, cwd: 'src/app/temp' },
        	{ dest: '<%= distdir %>/static/scripts', src : 'homepage/*', expand: true, cwd: 'src/app' }]
      },
      templet:{
      	files: [{ dest: '<%= distdir %>', src : 'templet/*', expand: true, cwd: 'src/app' }]
      }
    },
    requirejs:{
      compile:{
        /*options:{
          baseUrl:'<%= distdir %>/static',
          mainConfigFile:'<%= distdir %>/static/scripts/config.js',
          name:'scripts/index',
          //stubModules:['angular','jquery','jsencrypt'],
          out:'<%= distdir %>/static/scripts/index.app.js'
        }*/
        /*options:{
          baseUrl:'<%= distdir %>/static/scripts',
          //mainConfigFile:'<%= distdir %>/static/scripts/config.js',
          paths:{
            angular: "../tp/angular/angular.min",
            jquery: "../tp/jquery/jquery",
            jsencrypt: "../tp/jsencrypt/jsencrypt.min"
          },
          shim: {
            angular: {
              deps: ["jquery"],
              exports: "angular"
            },
            jsencrypt: {
              exports: "JSEncrypt"
            }
          },
          //name:'models/index',
          modules:[
            {
              name:'index',
              exclude:['angular','jquery','jsencrypt']
            }
          ],
          dir:'<%= distdir %>/static/scripts/temp'
          //skipModuleInsertion:true,
          //stubModules:['angular','jquery','jsencrypt'], // 过滤打包文件
          //out:'<%= distdir %>/static/scripts/index.app.js'
        }*/
        options:{
          baseUrl:'src/app',
          paths:{
            angular: "../../vendor/angular/angular.min",
            jquery: "../../vendor/jquery/jquery-3.1.1.min",
            jsencrypt: "../../vendor/jsencrypt/jsencrypt.min"
          },
          shim: {
            angular: {
              deps: ["jquery"],
              exports: "angular"
            },
            jsencrypt: {
              exports: "JSEncrypt"
            }
          },
          //name:'models/index',
          modules:[
            {
              name:'index',
              exclude:['angular','jquery','jsencrypt']
              //include:['controllers/common/main','controllers/common/header']
            }
          ],
          dir:'src/app/temp'
          //skipModuleInsertion:true,
          //stubModules:['angular','jquery','jsencrypt'], // 过滤打包文件
          //out:'<%= distdir %>/static/scripts/index.app.js'
        }
      }
    },
    /*karma: {
      unit: { options: karmaConfig('test/config/unit.js') },
      watch: { options: karmaConfig('test/config/unit.js', { singleRun:false, autoWatch: true}) }
    },
    html2js: {
      app: {
        options: {
          base: 'src/app'
        },
        src: ['<%= src.tpl.app %>'],
        dest: '<%= distdir %>/templates/app.js',
        module: 'templates.app'
      },
      common: {
        options: {
          base: 'src/common'
        },
        src: ['<%= src.tpl.common %>'],
        dest: '<%= distdir %>/templates/common.js',
        module: 'templates.common'
      }
    },*/
    concat:{
      /*dist:{
        options: {
          banner: "<%= banner %>"
        },
        src:['<%= src.js %>', '<%= src.jsTpl %>'],
        dest:'<%= distdir %>/<%= pkg.name %>.js'
      },
      index: {
        src: ['src/index.html'],
        dest: '<%= distdir %>/index.html',
        options: {
          process: true
        }
      },
      angular: {
        src:['vendor/angular/angular.js', 'vendor/angular/angular-route.js'],
        dest: '<%= distdir %>/angular.js'
      },
      mongo: {
        src:['vendor/mongolab/*.js'],
        dest: '<%= distdir %>/mongolab.js'
      },
      bootstrap: {
        src:['vendor/angular-ui/bootstrap/*.js'],
        dest: '<%= distdir %>/bootstrap.js'
      },
      jquery: {
        src:['vendor/jquery/*.js'],
        dest: '<%= distdir %>/jquery.js'
      }*/
      appJs : {
      	options: {
          banner: "<%= banner %>"
        },
        src:['src/app/temp/index.js','src/app/temp/controllers/**/*.js'],
        dest:'src/app/temp/index.js'
      }
    },
    uglify: {
      controllers:{
        src:['src/app/controllers/**/*.js'],
        dest:'src/app/temp/controllers.js'
      }
      /*dist:{
        options: {
          banner: "<%= banner %>"
        },
        src:['<%= src.js %>' ,'<%= src.jsTpl %>'],
        dest:'<%= distdir %>/<%= pkg.name %>.js'
      },
      angular: {
        src:['<%= concat.angular.src %>'],
        dest: '<%= distdir %>/angular.js'
      },
      mongo: {
        src:['vendor/mongolab/*.js'],
        dest: '<%= distdir %>/mongolab.js'
      },
      bootstrap: {
        src:['vendor/angular-ui/bootstrap/*.js'],
        dest: '<%= distdir %>/bootstrap.js'
      },
      jquery: {
        src:['vendor/jquery/*.js'],
        dest: '<%= distdir %>/jquery.js'
      }*/
      
    },
    /*recess: {
      build: {
        files: {
          '<%= distdir %>/<%= pkg.name %>.css':
          ['<%= src.less %>'] },
        options: {
          compile: true
        }
      },
      min: {
        files: {
          '<%= distdir %>/<%= pkg.name %>.css': ['<%= src.less %>']
        },
        options: {
          compress: true
        }
      }
    },
    watch:{
      all: {
        files:['<%= src.js %>', '<%= src.specs %>', '<%= src.lessWatch %>', '<%= src.tpl.app %>', '<%= src.tpl.common %>', '<%= src.html %>'],
        tasks:['default','timestamp']
      },
      build: {
        files:['<%= src.js %>', '<%= src.specs %>', '<%= src.lessWatch %>', '<%= src.tpl.app %>', '<%= src.tpl.common %>', '<%= src.html %>'],
        tasks:['build','timestamp']
      }
    },*/
    jshint:{
      files:['gruntFile.js', '<%= src.js %>', '<%= src.jsTpl %>', '<%= src.specs %>', '<%= src.scenarios %>'],
      options:{
        curly:true,
        eqeqeq:true,
        immed:true,
        latedef:true,
        newcap:true,
        noarg:true,
        sub:true,
        boss:true,
        eqnull:true,
        globals:{}
      }
    }
  });

};
