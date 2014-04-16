module.exports = (grunt) ->

  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-csscomb'
  grunt.loadNpmTasks 'grunt-csso'

  grunt.initConfig
    concat:
      css:
        src: [
          'bower_components/normalize.css/normalize.css',
          'out/css/style.css'
        ]
        dest: 'out/css/app.css'
    csscomb:
      all:
        files:
          'out/css/app.css': 'out/css/app.css'
    csso:
      all:
        files:
          'out/css/app.min.css': 'out/css/app.css'

  grunt.registerTask 'defaut', ['concat', 'csscomb', 'csso']