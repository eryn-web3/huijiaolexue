// @flow
import { combineReducers } from 'redux';

import user from './user';
import lang from './lang';
import storage from './storage';
import nav from './navigation';
import route from './route';
import favorite from './favorite';
import like from './like';

const rootReducer = combineReducers({
  nav,
  user,
  storage,
  route,
  favorite,
  like
});

export default rootReducer;
