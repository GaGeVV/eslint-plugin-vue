/**
 * @fileoverview Don&#39;t introduce side effects in computed properties
 * @author Michał Sajnóg
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/mixin-name-starts-with-mixin')
const RuleTester = require('eslint').RuleTester
const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module'
}

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester()
ruleTester.run('mixin-name-starts-with-mixin', rule, {
  valid: [
    {
      code: `Vue.component('test', {
        mixins: [mixinTest]
      })`,
      parserOptions
    }
  ],
  invalid: [
    {
      code: `
      new Vue({
        mixins: [Test]
      })`,
      parserOptions,
      errors: [{
        line: 3,
        message: 'Mixin name must start with "mixin", invalid mixin name "Test".'
      }],

    }
  ]
})

