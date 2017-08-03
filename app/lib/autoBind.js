import isUndefined from 'lodash.isundefined';
import isFunction from 'lodash.isfunction';
import forEach from 'lodash.foreach';
import includes from 'lodash.includes';

let wontBind = [
  'constructor',
  'render',
  'componentWillMount',
  'componentDidMount',
  'componentWillReceiveProps',
  'shouldComponentUpdate',
  'componentWillUpdate',
  'componentDidUpdate',
  'componentWillUnmount',
];

let toBind = [];

/**
 * From autobind-decorator (https://github.com/andreypopp/autobind-decorator/tree/master)
 * Return a descriptor removing the value and returning a getter
 * The getter will return a .bind version of the function
 * and memoize the result against a symbol on the instance
 */

function boundMethod (objPrototype, method, descriptor) {
  const fn = descriptor.value;

  return {
    configurable : true,
    get () {
      if (this === objPrototype || this.hasOwnProperty(method)) {
        return fn;
      }

      const boundFn = fn.bind(this);
      Object.defineProperty(this, method, {
        value        : boundFn,
        configurable : true,
        writable     : true,
      });
      return boundFn;
    },
  };
}

/**
 * Automatically binds methods defined within a component's Class to the
 * current object's lexical this instance.
 * (similarly to the default behavior of React.createClass).
 *
 * React 0.13 introduced the possibility to define components using plain
 * JavaScript ES6 classes. But differently from the traditional React.createClass,
 * user defined methods in a ES6 class are not automatically bound.
 * Autobind is an utility function that can be called from the class constructor
 * to bind the class methods to the component instance.
 *
 * Usage:
 *
 * constructor(props) {
 *   super(props);
 *   autoBind(this);
 * }
 *
 * Autobind is smart enough to avoid binding React related methods
 * (such as render and lifecycle hooks).
 *
 * You can also explicitly specify certain methods to exclude from binding:
 *
 *      constructor(props) {
 *          super(props);
 *          autoBind(this, {
 *              wontBind: ['leaveAlone1', 'leaveAlone2']
 *          });
 *      }
 *
 * Or specify the only methods that should be auto-bound:
 *
 *      constructor(props) {
 *          super(props);
 *          autoBind(this, {
 *              bindOnly: ['myMethod1', 'myMethod2']
 *          });
 *      }
 *
 * Naturally, wontBind and bindOnly cannot be used together.
 *
 * @param {object} context - Object to be processed
 * @param {object} options - Additional config
 * @return {*}
 */
export default function autoBind (context, options = {}) {
  if (isUndefined(context)) {
    throw new Error('Autobind error: No context provided.');
  }

  const objPrototype = Object.getPrototypeOf(context);

  if (options.bindOnly) {
    // If we want to bind *only* a set list of methods,
    // then do that (nothing else matters)
    toBind = options.bindOnly;
  } else {
    // Otherwise, bind all available methods in the class
    toBind = Object.getOwnPropertyNames(objPrototype);

    // And exclude anything explicitly passed in wontBind
    wontBind = [
      ...wontBind,
      ...(options.wontBind || []),
    ];
  }

  forEach(toBind, (method) => {
    const descriptor = Object.getOwnPropertyDescriptor(objPrototype, method);

    if (isUndefined(descriptor)) {
      throw new Error(`Autobind: "${method}" method not found in class.`);
    }

    // Return if it's special case function or if not a function at all
    if (includes(wontBind, method) || !isFunction(descriptor.value)) {
      return;
    }

    Object.defineProperty(
      objPrototype,
      method,
      boundMethod(objPrototype, method, descriptor)
    );
  });
}
