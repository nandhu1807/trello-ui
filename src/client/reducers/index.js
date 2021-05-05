import { combineReducers } from 'redux';
import getAllStagesReducer from './getAllStagesReducer';
import addNewStageReducer from './addNewStageReducer';
import getAllTaskReducer from './getAllTaskReducer';
import addNewTaskReducer from './addNewTaskReducer';

const reducers = combineReducers({
  getAllStagesReducer: getAllStagesReducer,
  addNewStageReducer: addNewStageReducer,
  getAllTaskReducer: getAllTaskReducer,
  addNewTaskReducer: addNewTaskReducer,
});

export default reducers;
