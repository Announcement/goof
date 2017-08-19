let helpers = require('helpers')

let empty = it => it === undefined || it === null
let exists = it => it !== undefined && it !== null

class Graph {
  constructor () {
    this.database = {}
  }

  put (it) {
    let subject = it.subject
    let predicate = it.predicate
    let object = it.object

    this.database[`${subject}:${predicate}:${object}`] = it
    this.database[`${subject}:${object}:${predicate}`] = it
    this.database[`${predicate}:${subject}:${object}`] = it
    this.database[`${predicate}:${object}:${subject}`] = it
    this.database[`${object}:${subject}:${predicate}`] = it
    this.database[`${object}:${predicate}:${subject}`] = it
  }

  get (it) {
    let subject = it.subject
    let predicate = it.predicate
    let object = it.object

    let query = [subject, predicate, object].filter(exists).join(':')
    let database = this.database
    let results = getResults()

    function getResults () {
      let results = []

      run()

      function run () {
        for (let key in database) {
          has(key)
        }
      }

      function has (key) {
        if (database.hasOwnProperty(key)) {
          task(database[key], key, database)
        }
      }

      function task (value, key, object) {
        let execute = it => it()

        let testSubject = () =>
          empty(it.subject) || value.subject === it.subject

        let testPredicate = () =>
          empty(it.predicate) || value.predicate === it.predicate

        let testObject = () =>
          empty(it.object) || value.object === it.object

        let test = () => [testSubject, testPredicate, testObject].every(execute)
        // let original = () =>
        if (test()) {
          results.push(value)
        }
      }

      return results.filter(helpers.query.unique.filter)
    }

    return results
  }

  addDependency (dependent, dependency) {
    this.put({
      subject: dependent,
      predicate: 'dependency',
      object: dependency
    })
  }
}

export default Graph
