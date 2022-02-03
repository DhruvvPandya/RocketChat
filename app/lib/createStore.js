import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import reducers from '../reducers';
import sagas from '../sagas';
import applyAppStateMiddleware from './appStateMiddleware';

let sagaMiddleware;
let enhancers;

if (__DEV__) {
	const reduxImmutableStateInvariant = require('redux-immutable-state-invariant').default();
	// const Reactotron = require('reactotron-react-native').default;
	sagaMiddleware = createSagaMiddleware(
	);
	const middleware = [];

	middleware.push(createLogger());
	enhancers = compose(
		applyAppStateMiddleware(),
		applyMiddleware(reduxImmutableStateInvariant),
		applyMiddleware(sagaMiddleware),
		applyMiddleware(...middleware)
		// Reactotron.createEnhancer()
	);
} else {
	sagaMiddleware = createSagaMiddleware();
	const middleware = [];

	middleware.push(createLogger());
	enhancers = compose(
		applyAppStateMiddleware(),
		applyMiddleware(...middleware),
		applyMiddleware(sagaMiddleware)
	);
}

const store = createStore(reducers, enhancers);
sagaMiddleware.run(sagas);

export default store;
