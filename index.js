/*!
 * write-yaml <https://github.com/jonschlinkert/write-yaml>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var YAML = require('js-yaml');
var writeFile = require('write');
var extend = require('extend-shallow');

var defaults = {
  indent:  2,
  skipInvalid:  false,
  flowLevel: -1
};

module.exports = function (dest, data, options) {
  options = extend({}, defaults, options);
  var yaml = options.safe ? YAML.safeDump : YAML.dump;

  try {
    return writeFile.sync(dest, yaml(data, options));
  } catch (err) {
    err.message = 'Failed to write "' + dest + '": ' + err.message;
    throw err;
  }
};
