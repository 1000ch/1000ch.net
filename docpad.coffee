config = {
  rootPath: process.cwd()
  packagePath: 'package.json'
  templateData:
    site:
      url: 'http://1000ch.net'
      title: '1000ch.net'
  collections:
    posts: ->
      @getCollection('html').findAllLive({isPost: true}, [{date:-1}])
  events:
    writeAfter: (options, next) ->
      safeps = require('safeps')
      path = require('path')

      rootPath = docpad.getConfig().rootPath
      gruntPath = path.join(rootPath, 'node_modules', '.bin', 'grunt')

      command = [gruntPath, 'debug']
      safeps.spawn(command, {
        cwd: rootPath,
        output: true
      }, next)

      @
}

module.exports = config