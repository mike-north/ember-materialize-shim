/* eslint-env node */
'use strict';
const fs = require('fs');
const path = require('path');
const assert = require('assert');

let materializePaths = null;
let fontPaths = null;

function determineMaterializePaths() {
  const jsFile = require.resolve('materialize-css');
  const jsDir = path.dirname(jsFile);
  const rootDir = path.dirname(require.resolve('materialize-css/package.json'));
  const mPackage = require('materialize-css/package.json');
  assert.equal(typeof mPackage.sass, 'string',
    `Failed to find Materialize SASS path via its (package.json).sass property (=${mPackage.sass}).`);
  const relativeSassFile = mPackage.sass;
  const sassFile = path.resolve(rootDir, relativeSassFile);
  const sassDir = path.dirname(sassFile);

  return {
    jsDir,
    jsFile,
    rootDir,
    sassDir,
    sassFile
  };
}


function getMaterializePaths() {
  if (!materializePaths) {
    materializePaths = determineMaterializePaths();
  }
  return materializePaths;
}


function determineFontPaths() {
  // TODO: Don't rely on fonts being bundled with materialize
  const rootDir = path.resolve(getMaterializePaths().jsDir, '..', 'fonts');
  // TODO: Maybe use glob here instead?
  const robotoFiles = fs.readdirSync(path.resolve(rootDir, 'roboto'));
  return {
    rootDir,
    robotoFiles
  };
}

function getFontPaths() {
  if (!fontPaths) {
    fontPaths = determineFontPaths();
  }
  return fontPaths;
}

module.exports = {
  determineFontPaths,
  determineMaterializePaths,
  getFontPaths,
  getMaterializePaths
};
