'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const pluralize = require('pluralize');

const crudName = 'Test';
const crudLowerCaseName = crudName.toLowerCase().trim();
const pluralizedLowerCaseName = pluralize(crudLowerCaseName);

describe('generator-mern:crud', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/crud'))
      .withArguments([crudName])
      .toPromise();
  });

  it('creates a service file', function () {
    assert.file([`api/${crudLowerCaseName}/${crudLowerCaseName}.service.js`]);
    assert.fileContent(`api/${crudLowerCaseName}/${crudLowerCaseName}.service.js`, `class ${crudName}Service {`);
  });

  it('creates a controller file', function () {
    assert.file([`api/${crudLowerCaseName}/${crudLowerCaseName}.controller.js`]);
    assert.fileContent(`api/${crudLowerCaseName}/${crudLowerCaseName}.controller.js`, `class ${crudName}Controller {`);
  });

  it('creates an index file', function () {
    assert.file([`api/${crudLowerCaseName}/index.js`]);
    assert.fileContent(`api/${crudLowerCaseName}/index.js`, `router.get('/api/${pluralizedLowerCaseName}', controller.findAll);`);
  });

  it('creates the actions file', function () {
    assert.file([`app/actions/${crudLowerCaseName}Actions.js`]);
    assert.fileContent(`app/actions/${crudLowerCaseName}Actions.js`, `export function get${crudName}(id) {`);
  });

  it('creates the reducer file', function () {
    assert.file([`app/reducers/${crudLowerCaseName}Reducer.js`]);
    assert.fileContent(`app/reducers/${crudLowerCaseName}Reducer.js`, `export const ${crudLowerCaseName} = (state = initialState.${crudLowerCaseName}, action) => {`);
  });

  it('creates the service file', function () {
    assert.file([`app/services/${crudLowerCaseName}Service.js`]);
    assert.fileContent(`app/services/${crudLowerCaseName}Service.js`, `class ${crudName}Service {`);
  });

  it('creates the page component file', function () {
    assert.file([`app/components/${crudLowerCaseName}/${crudName}Page.js`]);
    assert.fileContent(`app/components/${crudLowerCaseName}/${crudName}Page.js`, `class ${crudName}Page extends React.Component {`);
  });

  it('creates the list component file', function () {
    assert.file([`app/components/${crudLowerCaseName}/${crudName}List.js`]);
    assert.fileContent(`app/components/${crudLowerCaseName}/${crudName}List.js`, `const ${crudName}List`);
  });

  it('creates the detail component file', function () {
    assert.file([`app/components/${crudLowerCaseName}/${crudName}.js`]);
    assert.fileContent(`app/components/${crudLowerCaseName}/${crudName}.js`, `class ${crudName} extends React.Component {`);
  });

  it('creates the form component file', function () {
    assert.file([`app/components/${crudLowerCaseName}/${crudName}Form.js`]);
    assert.fileContent(`app/components/${crudLowerCaseName}/${crudName}Form.js`, `class ${crudName}Form extends React.Component {`);
  });

  it('creates the add page component file', function () {
    assert.file([`app/components/${crudLowerCaseName}/${crudName}AddPage.js`]);
    assert.fileContent(`app/components/${crudLowerCaseName}/${crudName}AddPage.js`, `class ${crudName}AddPage extends React.Component {`);
  });

  it('creates the edit page component file', function () {
    assert.file([`app/components/${crudLowerCaseName}/${crudName}EditPage.js`]);
    assert.fileContent(`app/components/${crudLowerCaseName}/${crudName}EditPage.js`, `class ${crudName}EditPage extends React.Component {`);
  });
});
