config = {
  rootPath: process.cwd()
  packagePath: 'package.json'
  templateData:
    site:
      url: 'http://1000ch.net'
      title: '1000ch.net'
  events:
    writeAfter: (options, next) ->
      safeps = require('safeps')
      path = require('path')

      rootPath = docpad.getConfig().rootPath
      gruntPath = path.join(rootPath, 'node_modules', '.bin', 'grunt')

      command = [gruntPath, 'concat', 'csscomb', 'csso']
      safeps.spawn(command, {
        cwd: rootPath,
        output: true
      }, next)

      @
}

module.exports = config