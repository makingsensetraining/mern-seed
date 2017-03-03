var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('name', { type: String, required: true });
  }

  writing() {
    // Extract the component name where argument provided was a path.
    const name = this.options.name.substring(this.options.name.lastIndexOf('/') + 1);

    this.fs.copyTpl(
      this.templatePath('component.js'),
      this.destinationPath(`app/components/${this.options.name}.js`), // TODO: Container directory should be a config.
      {
        name: name
      }
    );
  }
};
