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

**Warning**

Please take into account that every generator will create content based on the path you are already positioned.

Example 1:

```bash
/somepath/abc/somefolder $ yo mern:component Sidebar
```

Will add content inside *somefolder*.

Example 2:

```bash
/somepath/abc $ yo mern:component Sidebar
```

Will add content inside *abc*.

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

### CRUD

Generates a series of files used in a basic CRUD scaffolding.

You can pass a `--no-api` param to skip API files.

Example:

```bash
yo mern:crud Car
```

Produces:

- `api/car/car.schema.js`
- `api/car/car.service.js`
- `api/car/car.controller.js`
- `api/car/index.js`
- `app/actions/carActions.js`
- `app/reducers/carReducer.js`
- `app/services/carService.js`
- `app/components/car/CarPage.js`
- `app/components/car/CarList.js`
- `app/components/car/Car.js`
- `app/components/car/CarForm.js`
- `app/components/car/CarAddPage.js`
- `app/components/car/CarEditPage.js`

Updates:

- `addApiRoutes.js`
- `app/actions/actionTypes.js`
- `app/services/apiEndpoints.js`
- `app/reducers/index.js`
- `app/reducers/initialState.js`
- `app/routes.js`

Example with `--no-api`:

```bash
yo mern:crud Car --no-api
```

Produces:

- `app/actions/carActions.js`
- `app/reducers/carReducer.js`
- `app/services/carService.js`
- `app/components/car/CarPage.js`
- `app/components/car/CarList.js`
- `app/components/car/Car.js`
- `app/components/car/CarForm.js`
- `app/components/car/CarAddPage.js`
- `app/components/car/CarEditPage.js`

Updates:

- `app/actions/actionTypes.js`
- `app/services/apiEndpoints.js`
- `app/reducers/index.js`
- `app/reducers/initialState.js`
- `app/routes.js`

**Pro tip**: If you want to avoid the prompt when updating existing files use the option `--force`:

```bash
yo mern:crud Car --force
```
## License

MIT © [Making Sense](https://makingsense.com)


[npm-image]: https://badge.fury.io/js/generator-mern.svg
[npm-url]: https://npmjs.org/package/generator-mern
[daviddm-image]: https://david-dm.org/MakingSense/generator-mern.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/MakingSense/generator-mern
