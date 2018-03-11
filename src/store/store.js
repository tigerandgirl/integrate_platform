import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import * as channel from './channel_manage/reducer';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// let store = createStore(
//   combineReducers({...channel}),
//   applyMiddleware(thunk)
// );
let store = createStore(
  combineReducers({...channel}),
  composeEnhancers(applyMiddleware(thunk))
);

export default store;