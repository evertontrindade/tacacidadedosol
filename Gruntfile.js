module.exports = function(grunt) {
  var distdir = 'build/<%= pkg.name %>-<%= pkg.version %>';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    browserSync: {
      src: {
        src : ['./build/**/*']
      },
      options: {
        watchTask: true,
        server: {
          baseDir: './' + distdir + '/'
        }
      }
    },
    sprite:{
      all: {
        src: 'src/sprites/**/*.png',
        dest: 'src/img/spritesheet.png',
        destCss: 'src/css/sprites.css'
      }
    },

    concat: {
      js: {
        src: ['src/js/jquery.min.js','src/js/bootstrap.js', 'src/js/project.js'],
        dest:  distdir + '/js/script.js',
      },
      css: {
        src: ['src/css/bootstrap.css', 'src/css/bootstrap-theme.css', 'src/css/font-awesome.css', 'src/css/sprites.css', 'src/css/project.css'],
        dest: distdir + '/style.css',
      },
    },
    watch: {
      js: {
        files: ['src/js/**/*.js'],
        tasks: ['concat:js'],
      },
      css: {
        files: ['src/css/**/*.css'],
        tasks: ['concat:css'],
      },
      fonts: {
        files: ['src/fonts/**/*'],
        tasks: ['copy:fonts'],
      },
      images: {
        files: ['src/img/**/*'],
        tasks: ['copy:images'],
      },
      html: {
        files: ['src/**/*.html'],
        tasks: ['copy:html'],
      },
    },
    copy: {
      html: {
        files: [
          // includes files within path
          {expand: true, flatten:true, src: ['src/*.html'], dest: distdir + '/', filter: 'isFile'},
        ],
      },
      fonts: {
        files: [
          // includes files within path
          {expand: true, flatten:true, src: ['src/fonts/*.*'], dest: distdir + '/fonts/', filter: 'isFile'},
        ],
      },
      images: {
        files: [
          // includes files within path
          {expand: true, flatten:true, src: ['src/img/**/*'], dest: distdir + '/img/', filter: 'isFile'},
        ],
      },
    },
    image_resize: {
      resize: {
        options: {
          width: 350,
          height: 250,
          upscale:true,
          crop:true
        },
        src: 'src/images/noticias/*.jpg',
        dest: 'src/img/noticias-modified/'
      }
    },
    clean: {
      build: ["build"],
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-spritesmith');
  grunt.loadNpmTasks('grunt-image-resize');
  grunt.registerTask('default', ['clean', 'sprite', 'concat', 'image_resize', 'copy', 'browserSync', 'watch']);

};
