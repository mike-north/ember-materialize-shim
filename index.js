/* eslint-env node */
'use strict';

const path = require('path');
const Funnel = require('broccoli-funnel');
const Merge = require('broccoli-merge-trees');
const fastbootTransform = require('fastboot-transform');
const existsSync = require('exists-sync');

let FONT_FILES = [
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
  return `${app.bowerDirectory  }/materialize/dist/fonts/roboto/${  name}`;
}

module.exports = {
  name: 'ember-materialize-shim',
  included(appOrAddon) {
    this._super.included(appOrAddon);
    let app = appOrAddon;
    if (typeof appOrAddon.import !== 'function' && appOrAddon.app) {
      app = appOrAddon.app;
    }
    this.app = app;

    for (let i = 0; i < FONT_FILES.length; i++) {
      app.import(fontPath(app, FONT_FILES[i]), {
        destDir: 'assets'
      });
    }

    if (!(app.options['materialize-shim'] || {}).omitJS) {
      app.import('vendor/materialize/materialize.js');
      app.import('vendor/materialize-shim.js', {
        exports: {
          materialize: ['default']
        }
      });
    }
  },

  treeForVendor(tree) {
    let trees = [];

    if (tree) {
      trees.push(tree);
    }

    let materializePath = path.join(this.project.root, this.app.bowerDirectory, 'materialize', 'dist', 'js');
    if (existsSync(materializePath)) {
      let materializeTree = fastbootTransform(new Funnel(materializePath, {
        files: ['materialize.js'],
        destDir: 'materialize'
      }));

      trees.push(materializeTree);
    }

    return new Merge(trees);
  }
};
