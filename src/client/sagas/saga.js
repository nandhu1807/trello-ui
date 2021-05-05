import { takeLatest } from 'redux-saga/effects';
import actions from '../utils/actionTypes';
import getAllStagesSaga from './getAllStagesSaga';
import addNewStageSaga from './addNewStageSaga';
import getAllTaskSaga from './getAllTaskSaga';
import addNewTaskSaga from './addNewTaskSaga';
import updatePriorityForTaskSaga from './updatePriorityForTaskSaga';

export default function* saga() {
  yield takeLatest(actions.GET_ALL_STAGES, getAllStagesSaga);
  yield takeLatest(actions.ADD_NEW_STAGE, addNewStageSaga);
  yield takeLatest(actions.GET_ALL_TASK, getAllTaskSaga);
  yield takeLatest(actions.ADD_NEW_TASK, addNewTaskSaga);
  yield takeLatest(actions.UPDATE_PRIORITY, updatePriorityForTaskSaga);
}
