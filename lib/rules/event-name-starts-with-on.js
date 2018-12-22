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
      description: 'event handler\'s name must starts width "on"',
      category: 'custom',
      url: ''
    },
    fixable: null,
    schema: []
  }
}
