const Generator = require('yeoman-generator');
const ejs = require('ejs');

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
}