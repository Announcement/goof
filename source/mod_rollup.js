import rollup from 'rollup'
import plugin from './plugin'
import path from 'path'

let args
var cache

args = Array.prototype.slice.call(process.argv, 0)
args = args.filter(it => it !== process.execPath)
args = args.slice(1)
args = args.map(it => path.resolve(process.cwd(), it))
args = args.map(it => require.resolve(it))

args.forEach(roll)
// console.log(args)
// args = args.map(it => require.resolve(it))

function roll (location) {
  rollup
    .rollup({
      // The bundle's starting point. This file will be
      // included, along with the minimum necessary code
      // from its dependencies
      entry: location,
      // If you have a bundle you want to re-use (e.g., when using a watcher to rebuild as files change),
      // you can tell rollup use a previous bundle as its starting point.
      // This is entirely optional!
      plugins: [plugin()],
      onwarn: it => {},
      cache: cache
    })
    .then(function (bundle) {
      // Cache our bundle for later use (optional)
      cache = bundle

      // A Promise that fulfills with { code: string, sourcemap: object }
      return bundle.generate({
        // output format - 'amd', 'cjs', 'es', 'iife', 'umd'
        format: 'cjs'
      })
    })
    .then(function (result) {
      // (If the first choice was taken above)
      // console.log(result)
    })
    .catch(console.error) // log errors
}
