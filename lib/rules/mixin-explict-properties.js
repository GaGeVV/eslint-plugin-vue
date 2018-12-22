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
      description: 'disallow access implicit properties in miixn',
      category: 'custom',
      url: ''
    },
    fixable: null,
    schema: []
  }
}
