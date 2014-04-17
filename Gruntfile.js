module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
            ' * <%= pkg.name %> v<%= pkg.version %>\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
            ' */\n',
    jasmine: {
      all: {
        src: ['src/*.js'],
        options: {
          vendor: ['node_modules/sinon/pkg/sinon.js',],
          specs: 'spec/**/*.js',
          keepRunner: true
        }
      }
    },
    jshint: {
      options: {
        bitwise: true,
        curly: true,
        eqeqeq: true,
        forin: true,
        freeze: true,
        immed: true,
        indent: 2,
        latedef: true,
        newcap: true,
        noarg: true,
        nonbsp: true,
        plusplus: true,
        quotmark: 'single',
        undef: true,
        unused: true,
        strict: true,
        trailing: true,
        globals: {
          console: true,
          window: true,
        }
      },
      all: {
        files: {
          src: ['src/*.js', ]
        }
      },
      spec: {
        files: {
          src: ['spec/*.js']
        },
        options: {
          globals: {
            describe: true,
            it: true,
            expect: true,
            Router: true
          }
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      src: {
        files: ['src/**/*.js', 'spec/**/*.js'],
        tasks: ['jshint', 'jasmine:all', 'uglify:dist']
      },
      config: {
        files: ['Gruntfile.js', 'package.json'],
        options: {
          reload: true
        }
      }
    },
    uglify: {
      dist: {
        options: {
          banner: '<%= banner %>'
        },
        files: {
          'dist/router.min.js': ['src/*.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt');

  grunt.registerTask('build', ['uglify'])

  grunt.registerTask('default', ['watch']);

};