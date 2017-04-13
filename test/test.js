/*!
 * write-yaml <https://github.com/jonschlinkert/write-yaml>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

require('mocha');
var fs = require('fs');
var path = require('path');
var should = require('should');
var readYaml = require('read-yaml');
var writeYaml = require('..');
var should = require('should');

var files = ['tmp/a.md', 'tmp/b.md', 'tmp/c.md', 'tmp/d.md', 'tmp/e.md'];

describe('sync', function() {
  it('should write a yaml file synchronously', function() {
    writeYaml.sync('test/actual/a.yml', {a: {b: {c: {d: 'e'}}}});
    var json = readYaml.sync('test/actual/a.yml');
    json.a.should.have.property('b');
    json.a.b.should.have.property('c');
  });

  it('should use specified indentation.', function() {
    writeYaml.sync('test/actual/b.yml', {a: {b: {c: {d: 'e'}}}}, {indent: 4});
    var str = fs.readFileSync('test/actual/b.yml', 'utf8');
    var secondLine = str.split('\n')[1];
    var indent = secondLine.match(/^(\s+)/)[0].split('').length;
    indent.should.equal(4);
  });
});

describe('async', function() {
  it('should write a yaml file asynchronously', function(cb) {
    writeYaml('test/actual/a.yml', {a: {b: {c: {d: 'e'}}}}, function(err) {
      if (err) {
        console.log(err);
        return cb(err);
      }
      var json = readYaml.sync('test/actual/a.yml');
      json.a.should.have.property('b');
      json.a.b.should.have.property('c');
      cb();
    });
  });

  it('should use specified indentation.', function(cb) {
    writeYaml('test/actual/b.yml', {a: {b: {c: {d: 'e'}}}}, {indent: 4}, function(err) {
      if (err) {
        console.log(err);
        return cb(err);
      }
      var str = fs.readFileSync('test/actual/b.yml', 'utf8');
      var secondLine = str.split('\n')[1];
      var indent = secondLine.match(/^(\s+)/)[0].split('').length;
      indent.should.equal(4);
      cb();
    });
  });
});

