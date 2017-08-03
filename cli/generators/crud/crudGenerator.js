const Generator = require('yeoman-generator');
const ejs = require('ejs');
const acorn = require('acorn-jsx');
const escodegen = require('escodegen-wallaby');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  appendTpl(templatePath, destinationPath, data) {
    let generator = this;
    ejs.renderFile(templatePath, data, (err, renderedTemplate) => {
      if(err) throw err;
      
      let currentTree = acorn.parse(generator.fs.read(destinationPath), {sourceType: 'module' });
      let templateTree = acorn.parse(renderedTemplate, {sourceType: 'module' });
      
      templateTree.body.forEach(node => {
        if (!generator.nodeExistsInScope(node, currentTree)) {
          currentTree.body.push(node);
        }
      });

      generator.fs.write(destinationPath, escodegen.generate(currentTree));
    });
  }

  updateReducersConfiguration(indexDestinationPath, initialStateDestinationPath, data) {
    let reducers = [
      {
        name: data.pluralizedName,
        default: '[]'
      },
      {
        name: data.name,
        default: '{}'
      },
      {
        name: `saving${data.ucName}`,
        default: 'false'
      },
      {
        name: `${data.name}ToDelete`,
        default: "''"
      }
    ];

    let generator = this;
    let currentIndexTree = acorn.parse(this.fs.read(indexDestinationPath), {sourceType: 'module' });
    let currentInitialStateTree = acorn.parse(this.fs.read(initialStateDestinationPath), {sourceType: 'module' });

    let rootReducersArgument = currentIndexTree.body.find(node =>
      node.type === 'VariableDeclaration' && node.declarations[0].id.name === 'rootReducer'
    ).declarations[0].init.arguments[0];
    
    let initialStateDefaults = currentInitialStateTree.body.find(node =>
      node.type === 'ExportDefaultDeclaration'
    ).declaration;
    
    var existingImport = currentIndexTree.body.findIndex(node => 
      node.type === 'ImportDeclaration' && node.source.value === `./${data.name}Reducer`
    );

    if (existingImport != -1) {
      currentIndexTree.body.splice(existingImport, 1);
    }

    let newImport = acorn.parse(`import {${reducers.map(r => r.name).join(',')}} from './${data.name}Reducer';`, { sourceType: "module" });
    currentIndexTree.body.unshift(newImport);

    reducers.forEach(reducer => {
      generator.extendObject(rootReducersArgument, reducer.name);
      generator.extendObject(initialStateDefaults, reducer.name, reducer.default);
    });
    
    this.fs.write(indexDestinationPath, escodegen.generate(currentIndexTree));
    this.fs.write(initialStateDestinationPath, escodegen.generate(currentInitialStateTree));
  }

  updateRoutes(templatePath, destinationPath, data) {
    let generator = this;
    ejs.renderFile(templatePath, data, (err, renderedTemplate) => {
      if(err) throw err;

      let currentTree = acorn.parse(generator.fs.read(destinationPath), {sourceType: 'module', plugins: { jsx: true } });
      let templateTree = acorn.parse(renderedTemplate, {sourceType: 'module', plugins: { jsx: true } });

      let newImports = templateTree.body.filter(node => node.type === 'ImportDeclaration');

      newImports.forEach(node => {
        if (!generator.nodeExistsInScope(node, currentTree)) {
          currentTree.body.unshift(node);
        }
      });

      let currentRoutes = currentTree.body.find(node =>
        node.type === 'ExportDefaultDeclaration'
      ).declaration;

      let newRoutes = templateTree.body.find(node =>
        node.type === 'ExportDefaultDeclaration'
      ).declaration;

      let insertRouteAt = currentRoutes.children.findIndex(route =>
        route.openingElement && route.openingElement.name.name === "IndexRoute"
      );

      // TODO: ugly patch to avoid insert blank lines in JSX code.
      let newLineNode = acorn
        .parse('<t>\n      </t>', { plugins: { jsx:true } })
        .body[0].expression.children[0];
      
      newRoutes.children.forEach(newRoute => {
        if (newRoute.type === 'JSXElement' && !generator.nodeExistsInScope(newRoute, currentRoutes)) {
          currentRoutes.children.splice(++insertRouteAt, 0, newLineNode);
          currentRoutes.children.splice(++insertRouteAt, 0, newRoute);
        }
      });

      generator.fs.write(
        destinationPath, 
        escodegen.generate(currentTree, { format: { quotes: 'double' } })
      );
    });
  }

  addApiRoutes(destinationPath, data) {
    
    let currentTree = acorn.parse(this.fs.read(destinationPath), { sourceType: "module" });
    let functionBody = currentTree.body.find(node => node.type === 'FunctionDeclaration').body;
    let newStatement = acorn.parse(`app.use(require('./${data.name}/index.js'))`)

    if (!this.nodeExistsInScope(newStatement, functionBody))
    {
      functionBody.body.push(newStatement);
    }

    this.fs.write(destinationPath, escodegen.generate(currentTree));
  }

  nodeExistsInScope(node, context) {

    let nodeSrc = escodegen.generate(node);
    let contextSrc = escodegen.generate(context);

    return contextSrc.indexOf(nodeSrc) != -1;
  }

  extendObject(objectExpression, propertyName, propertyValue) {
    
    let existingProperty = objectExpression.properties.find((prop) =>
          prop.key.name === propertyName
    );
    
    let src = `x = {${propertyName}${propertyValue != undefined ? `: ${propertyValue}` : '' }}`;

    let newProperty = acorn.parse(src).body[0].expression.right.properties[0];

    if (!existingProperty) {
      objectExpression.properties.push(newProperty);
    } else {
      existingProperty.value = newProperty.value;
    }
  }
}
