module.exports = (grunt) ->

  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-csscomb'
  grunt.loadNpmTasks 'grunt-csso'
  grunt.loadNpmTasks 'grunt-contrib-copy'

  grunt.initConfig
    concat:
      css:
        src: [
          'bower_components/normalize.css/normalize.css',
          'bower_components/fontawesome/css/font-awesome.css',
          'out/css/default.css',
          'out/css/style.css'
        ]
        dest: 'out/css/app.css'
      js:
        src: []
        dest: 'out/js/app.js'
    csscomb:
      all:
        files:
          'out/css/app.css': 'out/css/app.css'
    csso:
      all:
        files:
          'out/css/app.min.css': 'out/css/app.css'
    copy:
      font:
        files: [{
          expand: true,
          flatten: true,
          src: ['bower_components/fontawesome/fonts/*'],
          dest: 'out/font',
          filter: 'isFile'
        }]
    uglify:
      js:
        files:
          'out/js/app.min.js': ['out/js/app.js']

  grunt.registerTask 'build', ['concat', 'csscomb', 'csso', 'copy']
  grunt.registerTask 'debug', ['concat', 'csso', 'copy']