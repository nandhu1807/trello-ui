import { put, call } from 'redux-saga/effects';
import actions from '../utils/actionTypes';
import { callFetchApi } from '../services/api';
import constants from '../utils/constants';

export default function* getAllTaskSaga() {
  try {
    const api = constants.getAllTask;
    const response = yield call(callFetchApi, api, {}, 'GET');
    yield put({
      type: actions.GET_ALL_TASK_SUCCESS,
      response: response.data,
    });
  } catch (e) {
    yield put({
      type: actions.GET_ALL_TASK_FAILURE,
      error: e,
    });
  }
}
