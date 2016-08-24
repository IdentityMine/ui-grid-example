module.exports = function (grunt) {
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      watch: {
          sass: {
              files: ['sass/**/*.{scss,sass}','sass/_partials/**/*.{scss,sass}'],
              tasks: ['sass:dist']
          },
          livereload: {
              files: ['*.html', '*.php', 'js/**/*.{js,json}', 'css/*.css','img/**/*.{png,jpg,jpeg,gif,webp,svg}'],
              options: {
                  livereload: true
              }
          }
      },
      sass: {
          options: {
              sourceMap: true,
              outputStyle: 'expanded'
              //options: expanded, compressed and sourceComments
          },
          dist: {
              files: {
                  'css/styles.css': 'sass/styles.scss'
              }
          }
      },
      concat: {
        options: {
            separator: ';'
        },
        dist: {
            src: [
                'node_modules/jquery/dist/jquery.js',
                'node_modules/angular/angular.js',
                'node_modules/ngtouch/src/ngTouch.js',
                'node_modules/angular-animate/angular-animate.js',
                'node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
                'node_modules/angular-ui-grid/ui-grid.js'
            ],
            dest: 'build/js/all-libs.js'
        }
    },

    uglify: {
        build: {
            src: ['build/js/all-libs.js'],
            dest: 'build/js/all-libs.min.js'
        }
    },
      copy: {
          main: {
              files: [
                   {
                        expand: true,
                        cwd: 'node_modules/angular-ui-grid/',
                        src: 'ui-grid.ttf', dest: 'build/css'
                   },
                   {
                        expand: true,
                        cwd: 'node_modules/angular-ui-grid/',
                        src: 'ui-grid.woff', dest: 'build/css'
                   },
                   {
                        expand: true,
                        cwd: 'node_modules/angular-ui-grid/',
                        src: 'ui-grid.svg', dest: 'build/css'
                   },
                   {
                        expand: true,
                        cwd: 'node_modules/angular-ui-grid/',
                        src: 'ui-grid.css', dest: 'build/css'
                   },
                   {
                       expand: true,
                       flatten: true,
                       cwd: 'node_modules/bootstrap/dist/css/',
                       src: ['**'], dest: 'build/css'
                   },
                   {
                       expand: true,
                       flatten: true,
                       cwd: 'node_modules/bootstrap/dist/fonts/',
                       src: ['**'], dest: 'build/fonts/'
                   },
                   {
                       expand: true,
                       flatten: true,
                       cwd: 'node_modules/font-awesome/css/',
                       src: ['**'], dest: 'build/css/'
                   },
                   {
                       expand: true,
                       flatten: true,
                       cwd: 'node_modules/font-awesome/fonts/',
                       src: ['**'], dest: 'build/fonts/'
                   }
               ]
           }
       }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['concat', 'uglify', 'copy', 'sass:dist', 'watch']);
};
