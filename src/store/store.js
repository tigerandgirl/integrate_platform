import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import * as login from './login/reducer';
import * as home from './home/reducer';
import * as channel from './channel_manage/reducer';
import * as erp from './erp_system_manage/reducer';

import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware'
import logger from 'redux-logger'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// let store = createStore(
//   combineReducers({...channel}),
//   applyMiddleware(thunk)
// );
let store = createStore(
  combineReducers({...login, ...home, ...erp, ...channel}),
  composeEnhancers(applyMiddleware(thunkMiddleware,promiseMiddleware(),logger))
);

export default store;
