# generator-mern [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url]
> A Yeoman generator to scaffold a MERN app

## Installation

First, install [Yeoman](http://yeoman.io) using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
```

Then link the generator-mern because is not available as global npm module. On the command line, from the root of your generator project (in the /cli folder), type:

```bash
npm link
```

That will install your project dependencies and symlink a global module to your local file.

## Generators

### Component

Generates a component in `app/components`. It has only one argument which is the name of the component/filename/path.

You can also pass an option between `--container` or `--stateless` in order to create other types of components.

Simplest example:

```bash
yo mern:component Sidebar
```

Produces `app/components/Sidebar.js`.

Example with folder:

```bash
yo mern:component Sidebar/Banner
```

Produces `app/components/Sidebar/Banner.js`.

Example for container component:

```bash
yo mern:component Sidebar --container
```

Produces `app/components/Sidebar.js`.

Example for stateless component:

```bash
yo mern:component Sidebar --stateless
```

Produces `app/components/Sidebar.js`.

## License

MIT © [Making Sense](https://makingsense.com)


[npm-image]: https://badge.fury.io/js/generator-mern.svg
[npm-url]: https://npmjs.org/package/generator-mern
[daviddm-image]: https://david-dm.org/MakingSense/generator-mern.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/MakingSense/generator-mern
