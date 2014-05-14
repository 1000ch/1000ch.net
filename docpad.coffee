config = {
  rootPath: process.cwd()
  packagePath: 'package.json'
  templateData:
    site:
      url: 'http://1000ch.net'
      title: '1000ch.net'
  collections:
    indexes: ->
      @getCollection('html').findAllLive({
        relativeOutDirPath: 'posts',
        isIndex: true
      })
    '2012': ->
      @getCollection('html').findAllLive({
        relativeOutDirPath: 'posts/2012'
      }, [{date:-1}])
    '2013': ->
      @getCollection('html').findAllLive({
        relativeOutDirPath: 'posts/2013'
      }, [{date:-1}])
    '2014': ->
      @getCollection('html').findAllLive({
        relativeOutDirPath: 'posts/2014'
      }, [{date:-1}])
  plugins:
    ghpages:
      deployRemote: 'www'
      deployBranch: 'master'
    cleanurls:
      static: true
      collectionName: 'indexes'
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