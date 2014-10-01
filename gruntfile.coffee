module.exports = (grunt) ->

  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-csscomb'
  grunt.loadNpmTasks 'grunt-csso'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-copy'

  grunt.initConfig
    concat:
      css:
        src: [
          'bower_components/normalize.css/normalize.css',
          'bower_components/fontawesome/css/font-awesome.css',
          'bower_components/highlight.js/src/styles/tomorrow.css',
          'out/css/default.css',
          'out/css/style.css'
        ]
        dest: 'out/css/app.css'
      js:
        src: [
          'out/js/script.js',
          'out/js/ga.js'
        ]
        dest: 'out/js/app.js'
    csscomb:
      all:
        files:
          'out/css/app.css': 'out/css/app.css'
    csso:
      all:
        files:
          'out/css/app.min.css': 'out/css/app.css'
    uglify:
      js:
        files:
          'out/js/app.min.js': ['out/js/app.js']
    copy:
      font:
        files: [{
          expand: true,
          flatten: true,
          src: ['bower_components/fontawesome/fonts/*'],
          dest: 'out/fonts',
          filter: 'isFile'
        }]

  grunt.registerTask 'build', ['concat', 'csscomb', 'csso', 'copy', 'uglify']
  grunt.registerTask 'debug', ['concat', 'csso', 'copy', 'uglify']