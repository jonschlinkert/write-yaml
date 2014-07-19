/**
 * write-file <https://github.com/assemble/write-file>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var should = require('should');
var readYaml = require('read-yaml');
var writeYaml = require('..');

describe('write yaml', function () {
  it('should write a yaml file synchronously', function () {
    writeYaml('test/actual/a.yml', {a: {b: {c: {d: 'e'}}}});
    var json = readYaml.sync('test/actual/a.yml');
    json.a.should.have.property('b');
    json.a.b.should.have.property('c');
  });

  it('should use specified indentation.', function () {
    writeYaml('test/actual/b.yml', {a: {b: {c: {d: 'e'}}}}, {indent: 4});
    var str = fs.readFileSync('test/actual/b.yml', 'utf8');
    var secondLine = str.split('\n')[1];
    var indent = secondLine.match(/^(\s+)/)[0].split('').length;
    indent.should.equal(4);
  });
});
