var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('name', { type: String, required: true });

    this.option('container', {
      desc: 'Creates a component of type React-Redux container',
      alias: 'c'
    });

    this.option('stateless', {
      desc: 'Creates a stateless component',
      alias: 's'
    });

    this.templateSuffix = '';
    if (this.options.container)
      this.templateSuffix = '-container';
    if (this.options.stateless)
      this.templateSuffix = '-stateless';
  }

  writing() {
    // Extract the component name where argument provided was a path.
    const name = this.options.name.substring(this.options.name.lastIndexOf('/') + 1);

    this.fs.copyTpl(
      this.templatePath(`component${this.templateSuffix}.js`),
      this.destinationPath(`app/components/${this.options.name}.js`),
      {
        name: name
      }
    );
  }
};
