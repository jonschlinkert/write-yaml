/*!
 * write-yaml <https://github.com/assemble/write-yaml>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */
'use strict';

var YAML = require('js-yaml');
var writeFile = require('write');
var extend = require('xtend');

var defaults = {
  indent:  2,
  skipInvalid:  false,
  flowLevel: -1
};


/**
 * **Example:**
 *
 * ```js
 * var yaml = require('write-yaml');
 * yaml('config.yml', {foo: {bar: {baz: 'quux'}}});
 * ```
 * Results in `config.yml` with the following contents:
 *
 * ```yaml
 * foo:
 *   bar:
 *     baz: quux
 * ```
 *
 * @param   {String} `dest` The destination filepath
 * @param   {String} `data` Object of data.
 * @param   {String} `options` Options to pass to js-yaml
 */

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
