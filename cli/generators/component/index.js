var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('name', { type: String, required: true });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('component.js'),
      this.destinationPath(`app/components/${this.options.name}.js`), // TODO: Container directory should be a config.
      {
        name: this.options.name
      }
    );
  }
};
