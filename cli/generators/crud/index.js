var Generator = require('yeoman-generator');
const pluralize = require('pluralize');
const utils = require('../../utils');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('name', { type: String, required: true });
  }

  writing() {
    const name = this.options.name.toLowerCase().trim();
    const pluralizedName = pluralize(name);
    const data = {
      name,
      ucName: utils.toFirstLetterUpperCase(name),
      pluralizedName,
      pluralizedUcName: utils.toFirstLetterUpperCase(pluralizedName)
    };

    // Controller.
    this.fs.copyTpl(
      this.templatePath('service.js'),
      this.destinationPath(`api/${name}/${name}.service.js`),
      data
    );

    // Service.
    this.fs.copyTpl(
      this.templatePath('controller.js'),
      this.destinationPath(`api/${name}/${name}.controller.js`),
      data
    );

    // Index.
    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath(`api/${name}/index.js`),
      data
    );

    // Actions.
    this.fs.copyTpl(
      this.templatePath('actions.js'),
      this.destinationPath(`app/actions/${name}Actions.js`),
      data
    );

    // Reducer.
    this.fs.copyTpl(
      this.templatePath('reducer.js'),
      this.destinationPath(`app/reducers/${name}Reducer.js`),
      data
    );

    // Service.
    this.fs.copyTpl(
      this.templatePath('appService.js'),
      this.destinationPath(`app/services/${name}Service.js`),
      data
    );

    // Components.
    this.fs.copyTpl(
      this.templatePath('components/page.js'),
      this.destinationPath(`app/components/${name}/${data.ucName}Page.js`),
      data
    );
    this.fs.copyTpl(
      this.templatePath('components/list.js'),
      this.destinationPath(`app/components/${name}/${data.ucName}List.js`),
      data
    );
    this.fs.copyTpl(
      this.templatePath('components/detail.js'),
      this.destinationPath(`app/components/${name}/${data.ucName}.js`),
      data
    );
    this.fs.copyTpl(
      this.templatePath('components/form.js'),
      this.destinationPath(`app/components/${name}/${data.ucName}Form.js`),
      data
    );
    this.fs.copyTpl(
      this.templatePath('components/addPage.js'),
      this.destinationPath(`app/components/${name}/${data.ucName}AddPage.js`),
      data
    );
    this.fs.copyTpl(
      this.templatePath('components/editPage.js'),
      this.destinationPath(`app/components/${name}/${data.ucName}EditPage.js`),
      data
    );
  }
};
