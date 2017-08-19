export default function (configuration = {}) {
  const name = 'rollup-plugin'

  return {
    name,
    options,
    load,
    resolveId
  }

  function options (it) {
    // console.log('options', it)
  }

  function resolveId (importee, importer) {
    // console.log('resolveId', importee, importer)
    // return false
  }

  function load (id) {
    console.log('load', id.replace(process.cwd(), ''))
    // return null
  }
}
