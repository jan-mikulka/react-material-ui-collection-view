import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createDebounce from 'redux-debounced';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import normalizrMiddleware from 'redux-normalizr-middleware';
import initialState from './initialState';
import dataReducer from './dataReducer';
import uiReducer from './uiReducer';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import {configure, authStateReducer} from "redux-auth";
import listen from 'redux-action-listeners';
import listener from './listener';

const rootReducer = combineReducers({
  auth: authStateReducer,
  routing: routerReducer,
  data: dataReducer,
  ui: uiReducer
});


// mluvili jsme o použitém middleware - jaký používáte vy?
export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        thunk,
        reduxImmutableStateInvariant(),
        normalizrMiddleware(),
        createDebounce(),
        routerMiddleware(browserHistory),
        listen(listener)
      ),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
}
