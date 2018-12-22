/**
 * @fileoverview Don&#39;t introduce side effects in computed properties
 * @author Michał Sajnóg
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/explict-properties')
const RuleTester = require('eslint').RuleTester

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  }
})
ruleTester.run('explict-properties', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: `
      <template>
        <a :test="a + $data.b.c + 1"></a>
      </template>
      <script>
      export default {
        data() {
          return {
            a: 0
          };
        },
        methods: {
          printA() {
            console.log(this.a);
          }
        }
      }
      </script>`
    },
    {
      code: `Vue.component('test', {
        data() {
          return {
            a: 0
          };
        },
        methods: {
          printA() {
            console.log(this.a + this._b + this.$b);
          }
        }
      })`
    },
    {
      code: `Vue.component('test', {
        props: {
          abc: String
        },
        data() {
          return {
            a: 0,
            b: 1,
          };
        },
        computed: {
          c() {
            return this.a + this.b;
          }
        },
        methods: {
          printA() {
            console.log(this.a);
          },
          printB() {
            console.log(this.b);
          },
          printC() {
            console.log(this.c);
          },
          printD() {
            console.log(this.abc);
          }
        }
      })`,
    },
    {
      code: `Vue.component('test', {
        mixins: [mixinAbc],
        props: {
          abc: String
        },
        data() {
          return {
            a: 0,
            b: 1,
          };
        },
        computed: {
          c() {
            return this.a + this.b;
          }
        },
        methods: {
          printA() {
            console.log(this.a);
          },
          printB() {
            console.log(this.b);
          },
          printC() {
            console.log(this.c);
          },
          printD() {
            console.log(this.printD());
          },
          printAbc() {
            this.mixinAbc.printAbc();
          }
        }
      })`,
    },
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: `
      <template>
        <a :test="a + $data.b.c + 1 + b"></a>
      </template>
      <script>
      export default {
        data() {
          return {
            a: 0
          };
        },
        methods: {
          printA() {
            console.log(this.a);
          }
        }
      }
      </script>`,
      errors: [{
        line: 3,
        message: 'Disallow access implict properties "b".'
      }]
    },
    {
      code: `Vue.component('test', {
        data() {
          return {
            a: 0
          };
        },
        methods: {
          printA() {
            console.log(this.b);
          }
        }
      })`,
      errors: [{
        line: 9,
        message: 'Disallow access implict properties "b".'
      }]
    },
    {
      code: `Vue.component('test', {
        data() {
          return {
            a: 0,
            b: 1,
          };
        },
        computed: {
          c() {
            return this.a + this.b;
          }
        },
        methods: {
          printA() {
            console.log(this.a);
          },
          printB() {
            console.log(this.b);
          },
          printC() {
            console.log(this.c);
          },
          printD() {
            console.log(this.d);
          }
        }
      })`,
      errors: [{
        line: 24,
        message: 'Disallow access implict properties "d".'
      }]
    },
  ]
})

