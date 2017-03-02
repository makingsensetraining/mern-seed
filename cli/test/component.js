'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

var componentName = 'TestComponent';

describe('generator-mern:component', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/component'))
      .withArguments([componentName])
      .toPromise();
  });

  it('creates a component file', function () {
    assert.file(['app/components/' + componentName + '.js']); // TODO: Container directory should be a config.
  });
});
