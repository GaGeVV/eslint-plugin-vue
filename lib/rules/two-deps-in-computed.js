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
      description: 'there must be two deps in computed',
      category: 'custom',
      url: ''
    },
    fixable: null,
    schema: []
  }
}
