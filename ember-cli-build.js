'use strict';
const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
const getMaterializePaths = require('./utils.js').getMaterializePaths;

const MATERIALIZE_SASS_FOLDER = getMaterializePaths().sassDir;

module.exports = function(defaults) {
  let app = new EmberAddon(defaults, {
    sassOptions: {
      includePaths: [MATERIALIZE_SASS_FOLDER]
    }
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return app.toTree();
};
