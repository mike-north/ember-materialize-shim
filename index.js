/* eslint-env node */
'use strict';

var FONT_FILES = [
  'Roboto-Thin.woff2',
  'Roboto-Thin.woff',
  'Roboto-Thin.ttf',
  'Roboto-Light.woff2',
  'Roboto-Light.woff',
  'Roboto-Light.ttf',
  'Roboto-Regular.woff2',
  'Roboto-Regular.woff',
  'Roboto-Regular.ttf',
  'Roboto-Medium.woff2',
  'Roboto-Medium.woff',
  'Roboto-Medium.ttf',
  'Roboto-Bold.woff2',
  'Roboto-Bold.woff',
  'Roboto-Bold.ttf'
];


function fontPath(app, name) {
  return app.bowerDirectory + '/materialize/dist/fonts/roboto/' + name;
}

module.exports = {
  name: 'ember-materialize-shim',
  included: function(appOrAddon) {
    this._super.included(appOrAddon);
    var app = appOrAddon;
    if (typeof appOrAddon.import !== 'function' && appOrAddon.app) {
      app = appOrAddon.app;
    }
    this.app = app;

    for (var i = 0; i < FONT_FILES.length; i++) {
      app.import(fontPath(app, FONT_FILES[i]), {
        destDir: 'assets'
      });
    }

    if (!process.env.EMBER_CLI_FASTBOOT && !(app.options['materialize-shim'] || {}).omitJS) {
      app.import(app.bowerDirectory + '/materialize/dist/js/materialize.js');
      app.import('vendor/materialize-shim.js', {
        exports: {
          materialize: ['default']
        }
      });
    }
  }
};
