const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const os = require('os')

const Graph = require('../header/graph')

// let empty = it => it === undefined || it === null
let exists = it => it !== undefined && it !== null

let graph = new Graph()
// let results

function completed () {
  let modules = graph.get({predicate: 'name'}).map(it => it.object)
  console.log(`Detected ${modules.length} module(s).`)
  // console.log(columnify(mo))
  // rl.resume()
}

function map (object, name) {
  Object.keys(object).forEach(key => {
    if (exists(object[key])) {
      onString()
      onNumber()
      onArray()
      onObject()
    }

    function onString () {
      if (object[key].constructor === String) {
        graph.put({subject: name, predicate: key, object: object[key]})
      }
    }
    function onNumber () {
      if (object[key].constructor === Number) {
        graph.put({subject: name, predicate: key, object: object[key]})
      }
    }
    function onArray () {
      if (object[key].constructor === Array) {
        object[key].forEach(item => {
          graph.put({subject: name, predicate: key, object: item})
        })
      }
    }
    function onObject () {
      if (object[key].constructor === Object) {
        Object.keys(object[key]).forEach(item => {
          graph.put({subject: name, predicate: key, object: item})
        })

        map(object[key], key)
      }
    }
  })
}

function readPackage (location) {
  let readFilePath = location
  let readFileOptions = {encoding: 'utf8'}

  fs.readFile(readFilePath, readFileOptions, readFileCallback)

  function readFileCallback (error, contents) {
    if (!error) {
      let object = JSON.parse(contents)
      let name = object.name
      map(object, name)
    }
  }
}

// function readModules (location) {
//
// }

function build (initial) {
  let locations = [initial]
  let location
  let packages = []

  stat()

  function stat () {
    if (locations.length > 0) {
      location = locations.shift()
      fs.stat(location, statCallback)
    } else {
      process.stdout.clearLine()
      process.stdout.cursorTo(0)
      process.stdout.write(os.EOL)
      completed()
    }
  }
  function statCallback (error, stats) {
    if (!error) {
      statSuccessful(stats)
    }
  }

  function statSuccessful (stats) {
    checkDirectory(stats)
    checkFile(stats)
  }
  function checkDirectory (stats) {
    if (stats.isDirectory()) {
      process.stdout.clearLine()
      process.stdout.cursorTo(0)
      process.stdout.write(chalk.gray('direrctory'))
      process.stdout.write(' ')
      process.stdout.write(location)
      readdir()
    } else {
      stat()
    }
  }
  function checkPackage () {
    if (location.match(/package\.json$/mi)) {
      let information = path.parse(location)
      let format = it => {
        return it
          .replace(/\\/g, '/')
          .replace(/node_modules/g, '::')
          .replace(/\/?::\/?/g, '::')
          .replace(/\//g, chalk.gray('/'))
          .replace(/::/g, chalk.gray('::'))
      }

      process.stdout.clearLine()
      process.stdout.cursorTo(0)
      process.stdout.write(chalk.blue('package'))
      process.stdout.write(' ')
      process.stdout.write(format(information.dir))
      process.stdout.write(os.EOL)
      packages.push(location)
      readPackage(location)
    } else {
      process.stdout.clearLine()
      process.stdout.cursorTo(0)
      process.stdout.write(chalk.gray('file'))
      process.stdout.write(' ')
      process.stdout.write(location)
    }
  }
  function checkFile (stats) {
    if (stats.isFile()) {
      checkPackage()
    }
  }

  function readdir () {
    fs.readdir(location, readdirCallback)
  }
  function readdirCallback (error, files) {
    if (!error) {
      readdirSuccessful(files)
    }
  }

  function readdirSuccessful (files) {
    files.forEach(forEachFile)
    stat()
  }
  function forEachFile (file) {
    if (!file.match(/^\./)) {
      locations.push(path.join(location, file))
    }
  }
}

// readPackage('./package.json')
build('.')
// readModules('./node_modules')

// graph.put({ subject: 'gulp', predicate: 'dependency', object: 'chalk' })

// results = graph.get({subject: 'app'})
// console.log(results)
