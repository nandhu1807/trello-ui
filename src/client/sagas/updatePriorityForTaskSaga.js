import { put, call } from 'redux-saga/effects';
import actions from '../utils/actionTypes';
import { callFetchApi } from '../services/api';
import constants from '../utils/constants';

export default function* updatePriorityForTaskSaga(action) {
  try {
    const api = constants.updatePriorityTask;
    const response = yield call(callFetchApi, api, {}, 'PUT', action.payload.task);
    yield put({
      type: actions.UPDATE_PRIORITY_SUCCESS,
      response: response.data,
    });
    yield put({
      type: actions.GET_ALL_TASK,
    });
  } catch (e) {
    yield put({
      type: actions.UPDATE_PRIORITY_FAILURE,
      error: e,
    });
  }
}
