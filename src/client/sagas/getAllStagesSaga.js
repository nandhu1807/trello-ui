import { put, call } from 'redux-saga/effects';
import actions from '../utils/actionTypes';
import { callFetchApi } from '../services/api';
import constants from '../utils/constants';

export default function* getAllStagesSaga() {
  try {
    const api = constants.getAllStages;
    const response = yield call(callFetchApi, api, {}, 'GET');
    yield put({
      type: actions.GET_ALL_STAGES_SUCCESS,
      response: response.data,
    });
  } catch (e) {
    yield put({
      type: actions.GET_ALL_STAGES_FAILURE,
      error: e,
    });
  }
}
