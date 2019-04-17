import { combineReducers } from 'redux'
import settingsReducer from './settings';

export const allReducers = combineReducers({
  settings: settingsReducer,
});

