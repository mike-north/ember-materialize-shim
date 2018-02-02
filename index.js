/* eslint-env node */
'use strict';

const Funnel = require('broccoli-funnel');
const Merge = require('broccoli-merge-trees');
const fastbootTransform = require('fastboot-transform');
const existsSync = require('exists-sync');

const utils = require('./utils.js');

/**
 * @type {string}
 */
const MATERIALIZE_JS_FOLDER = utils.getMaterializePaths().jsDir;
const FONTS_FOLDER = utils.getFontPaths().rootDir;

module.exports = {
  name: 'ember-materialize-shim',
  included(appOrAddon) {
    this._super.included(appOrAddon);
    let app = appOrAddon;
    if (typeof appOrAddon.import !== 'function' && appOrAddon.app) {
      app = appOrAddon.app;
    }
    this.app = app;

    if (!(app.options['materialize-shim'] || {}).omitJS) {
      app.import('vendor/materialize/materialize.js');
      app.import('vendor/materialize-shim.js');
    }

    if (!(app.options['materialize-shim'] || {}).omitFonts) {
      utils.getFontPaths().robotoFiles.forEach(font => {
        app.import(`vendor/fonts/roboto/${font}`, {
          destDir: 'assets'
        });
      });
    }
  },

  treeForVendor(tree) {
    const trees = [];

    if (tree) {
      trees.push(tree);
    }

    if (existsSync(MATERIALIZE_JS_FOLDER)) {
      const materializeJsTree = fastbootTransform(
        new Funnel(MATERIALIZE_JS_FOLDER, {
          files: ['materialize.js'],
          destDir: 'materialize'
        })
      );
      trees.push(materializeJsTree);
    } else {
      throw new Error(`Could not find materialize JS folder (${MATERIALIZE_JS_FOLDER})`);
    }

    if (existsSync(FONTS_FOLDER)) {
      const fontsTree = fastbootTransform(
        new Funnel(FONTS_FOLDER, {
          destDir: 'fonts'
        })
      );
      trees.push(fontsTree);
    } else {
      throw new Error(`Could not find fonts folder (${FONTS_FOLDER})`);
    }

    return new Merge(trees);
  }
};
