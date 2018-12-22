/**
 * @fileoverview Report used components
 * @author Wang Chen
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = require('../utils')

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'bool variables must starts with is/show',
      category: 'custom',
      url: ''
    },
    fixable: null,
    schema: []
  }
}
