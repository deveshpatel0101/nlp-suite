import { createStore, combineReducers } from 'redux';
import userReducer from '../reducers/user';
import messageReducer from '../reducers/message';
import projectReducer from '../reducers/projects';

export default () => {
  const store = createStore(
    combineReducers({
      user: userReducer,
      message: messageReducer,
      projects: projectReducer,
    }),
  );
  return store;
};
