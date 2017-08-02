const Generator = require('yeoman-generator');
const ejs = require('ejs');
const program = require("ast-query");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  appendTpl(templatePath, destinationPath, data) {
    let fs = this.fs;
    ejs.renderFile(templatePath, data, (err, renderedTemplate) => {
      if(err) throw err;

      fs.copy(
        destinationPath,
        destinationPath,
        {
          process: (content) => content.toString() + renderedTemplate
        }
      );
    });
  }

  updateReducersConfiguration(indexDestinationPath, initialStateDestinationPath, data) {
    this.fs.copy(
      indexDestinationPath,
      indexDestinationPath,
      {
        process: (content) => {

          var tree = program(content.toString(), null, {sourceType: 'module'});
          var combineReducersArguments = tree.callExpression('combineReducers').arguments.at(0);

          tree.body.prepend(`import { ${data.pluralizedName}, ${data.name}, saving${data.ucName}, ${data.name}ToDelete} from './${data.name}Reducer';`);
          combineReducersArguments.key(data.name).value(data.name);
          combineReducersArguments.key(data.pluralizedName).value(data.pluralizedName);
          combineReducersArguments.key(`saving${data.ucName}`).value(`saving${data.ucName}`);
          combineReducersArguments.key(`${data.name}ToDelete`).value(`${data.name}ToDelete`);

          return tree.toString();
        }
      }
    );

    this.fs.copy(
      initialStateDestinationPath,
      initialStateDestinationPath,
      {
        process: (content) => {
          var tree = program(content.toString(), null, {sourceType: 'module'});
          var exportDefault = tree.var('exportDefault').value();

          exportDefault.key(data.name).value('{}');
          exportDefault.key(data.pluralizedName).value('[]');
          exportDefault.key(`saving${data.ucName}`).value('false');
          exportDefault.key(`${data.name}ToDelete`).value("''");

          return tree.toString();
        }
      }
    );
  }
}
