/**
 * @fileoverview Report used components
 * @author Michał Sajnóg
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = require('../utils')
const casing = require('../utils/casing')
const RESERVED_NAMES = new Set(require('../utils/js-reserved.json'))

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

const GROUP_NAMES = ['props', 'computed', 'data', 'methods', 'mixins']

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'disallow access implict properties',
      category: 'essential',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0/docs/rules/no-unused-components.md'
    },
    fixable: null,
    schema: []
  },

  create (context) {
    let allowedProperties = []
    let checkNodeList = []
    let scope = {
      parent: null,
      nodes: []
    }

    return utils.defineTemplateBodyVisitor(context, Object.assign({
      VElement (node) {
        scope = {
          parent: scope,
          nodes: scope.nodes.slice() // make copy
        }
        if (node.variables) {
          for (const variable of node.variables) {
            const varNode = variable.id
            const name = varNode.name
            if (!scope.nodes.some(node => node.name === name)) { // Prevent adding duplicates
              scope.nodes.push(varNode)
            }
          }
        }
      },
      'VElement:exit' (node) {
        scope = scope.parent
      }
    }, {
        'VExpressionContainer Identifier' (node) {
          const propertyName = node.name;
          if (!propertyName ||
            node.parent && node.parent.type === 'MemberExpression' ||
            scope.nodes.some(el => el.name === propertyName) ||
            RESERVED_NAMES.has(propertyName) ||
            allowedProperties.includes(propertyName) ||
            propertyName[0] === '$'
          ) {
            return
          }

          context.report({
            node,
            loc: node.loc,
            message: `Disallow access implict properties "${propertyName}".`
          })
        }
      },
      {
        'VExpressionContainer MemberExpression > Identifier' (node) {
          const propertyName = node.name;
          if (!propertyName ||
            node.parent.object.name !== node.name ||
            scope.nodes.some(el => el.name === propertyName) ||
            RESERVED_NAMES.has(propertyName) ||
            allowedProperties.includes(propertyName) ||
            propertyName[0] === '$'
          ) {
            return
          }

          context.report({
            node,
            loc: node.loc,
            message: `Disallow access implict properties "${propertyName}".`
          })
        }
      }
    ), Object.assign({}, {
      'MemberExpression' (node) {
        if (node.type !== 'MemberExpression') return
        const members = utils.parseMemberExpression(node)
        // console.log(members, allowedProperties)
        if (members[0] === 'this'
          && members[1]
          && members[1][0] !== '$'
          && members[1][0] !== '_'
        ) {
          checkNodeList.push(node)
        }
      },
    }, utils.executeOnVue(context, (obj) => {
      const usedNames = []
      const groups = new Set(GROUP_NAMES)
      const properties = utils.iterateProperties(obj, groups)

      for (const o of properties) {
        // console.log('---------------------', o.name)
        allowedProperties.push(o.name)
      }

      checkNodeList.forEach(node => {
        const members = utils.parseMemberExpression(node)
        if (!allowedProperties.includes(members[1])) {
          context.report({
            node: node,
            message: 'Disallow access implict properties "{{key}}".',
            data: { key: members[1] }
          })
        }
      })
    })))
  }
}
