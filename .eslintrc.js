module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },

  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },

  extends: ['standard'],
  // extends: ['prettier'],
  // extends: ['standard', 'prettier'],

  plugins: ['standard', 'promise', 'jsdoc'],
  // plugins: ['standard', 'prettier', 'promise', 'jsdoc'],

  rules: {
    'max-len': [2, { code: 80, ignoreComments: true }],
    'max-nested-callbacks': [2, { max: 3 }],
    'consistent-return': 2,
    'global-require': 2,
    'semi': [2, 'never'],
    'vars-on-top': 1,
    'quotes': [2, 'single'],
    'complexity': [1, { max: 2 }],
    'max-depth': [1, { max: 3 }],
    'max-params': [1, { max: 3 }],

    // 'prettier/prettier': ['error', {'singleQuote': true, 'semi': false}],

    'jsdoc/check-param-names': 1,
    'jsdoc/check-tag-names': 1,
    'jsdoc/check-types': 1,
    'jsdoc/newline-after-description': 1,
    'jsdoc/require-description-complete-sentence': 1,
    'jsdoc/require-example': 0,
    'jsdoc/require-hyphen-before-param-description': 1,
    'jsdoc/require-param': 1,
    'jsdoc/require-param-description': 1,
    'jsdoc/require-param-type': 1,
    'jsdoc/require-returns-description': 1,
    'jsdoc/require-returns-type': 1
  },
  settings: {
    jsdoc: {
      tagNamePreference: {}
    }
  }
}
