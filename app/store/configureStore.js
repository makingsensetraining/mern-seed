import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

const logger = createLogger();

// In order to use the devtools (https://github.com/gaearon/redux-devtools)
// we prepare it to enhance the store.
const devtools = window.devToolsExtension ? window.devToolsExtension() : f => f;

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        thunk,
        reduxImmutableStateInvariant(),
        logger
      ),
      devtools
    )
  );
}
