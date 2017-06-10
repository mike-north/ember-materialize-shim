if (typeof FastBoot === 'undefined') {
  /* globals define, Materialize */

  (function() {

    function generateModule(name, values) {
      define(name, [], function() {
        'use strict';

        return values;
      });
    }

    generateModule('materialize', { 'default': Materialize });
  })();
}