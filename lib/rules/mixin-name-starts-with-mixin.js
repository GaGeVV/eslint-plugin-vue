/**
 * @fileoverview Report used components
 * @author Michał Sajnóg
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = require('../utils')

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

const GROUP_NAMES = ['mixins']

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Mixin name must start with "mixin"',
      category: 'essential',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0/docs/rules/no-unused-components.md'
    },
    fixable: null,
    schema: []
  },

  create (context) {
    return utils.executeOnVue(context, (obj) => {
      const groups = new Set(GROUP_NAMES)
      const properties = utils.iterateProperties(obj, groups)

      for (const o of properties) {
        // console.log('---------------', o)
        if (!o.name.startsWith('mixin')) {
          context.report({
            node: o.node,
            message: 'Mixin name must start with "mixin", invalid mixin name "{{key}}".',
            data: { key: o.name }
          })
        }
      }
    })
  }
}
