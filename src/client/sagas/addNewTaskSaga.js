import { put, call } from 'redux-saga/effects';
import actions from '../utils/actionTypes';
import { callFetchApi } from '../services/api';
import constants from '../utils/constants';

export default function* addNewTaskSaga(action) {
  try {
    const api = constants.addNewTask;
    const response = yield call(callFetchApi, api, {}, 'POST', action.payload.task);
    yield put({
      type: actions.ADD_NEW_TASK_SUCCESS,
      response: response.data,
    });
    if (response.data === 'Task Saved Successfully') {
      yield put({
        type: actions.GET_ALL_TASK,
      });
    }
  } catch (e) {
    yield put({
      type: actions.ADD_NEW_TASK_FAILURE,
      error: e,
    });
  }
}
