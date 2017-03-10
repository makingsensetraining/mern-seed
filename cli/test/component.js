'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const componentName = 'TestComponent';

describe('generator-mern:component', function () {
  before(function () {
  return helpers.run(path.join(__dirname, '../generators/component'))
    .withArguments([componentName])
    .toPromise();
  });

  it('creates a component file', function () {
  assert.file([`app/components/${componentName}.js`]); // TODO: Container directory should be a config.
  assert.fileContent(`app/components/${componentName}.js`, `class ${componentName} extends React.Component`);
  });
});
