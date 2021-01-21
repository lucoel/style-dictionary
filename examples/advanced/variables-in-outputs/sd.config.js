module.exports = {
  format: {
    // Adding a custom format to show how to get an alias's name.
    customFormat: function({dictionary, options}) {
      return dictionary.allProperties.map(token => {
        let value = JSON.stringify(token.value);
        // new option added to decide whether or not to output references
        if (options.outputReferences) {
          // the `dictionary` object now has `usesReference()` and
          // `getReference()` methods. `usesReference()` will return true if
          // the value has a reference in it. `getReference()` will return
          // the reference to the whole token so that you can access its
          // name or any other attributes.
          if (dictionary.usesReference(token.original.value)) {
            const reference = dictionary.getReference(token.original.value);
            value = reference.name;
          }
        }

        return `export const ${token.name} = ${value};`
      }).join(`\n`)
    }
  },

  source: ['tokens/**/*.json'],
  platforms: {
    json: {
      buildPath: 'build/',
      files: [{
        destination: 'tokens.json',
        format: 'json/nested'
      }]
    },
    js: {
      buildPath: 'build/',
      transformGroup: 'js',
      files: [{
        destination: 'tokens.js',
        format: 'customFormat',
        options: {
          outputReferences: true
        }
      }]
    },
    css: {
      transformGroup: 'css',
      buildPath: 'build/',
      files: [{
        destination: 'tokens.css',
        format: 'css/variables',
        options: {
          outputReferences: true, // new setting, if true will use variable references
        }
      },{
        destination: 'tokens.scss',
        format: 'scss/variables',
        options: {
          outputReferences: true, // new setting, if true will use variable references
        }
      }]
    }
  }
};