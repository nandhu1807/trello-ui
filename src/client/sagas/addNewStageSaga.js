import { put, call } from 'redux-saga/effects';
import actions from '../utils/actionTypes';
import { callFetchApi } from '../services/api';
import constants from '../utils/constants';

export default function* addNewStageSaga(action) {
  try {
    const api = constants.addNewStage;
    const response = yield call(callFetchApi, api, {}, 'POST', action.payload.stage);
    yield put({
      type: actions.ADD_NEW_STAGE_SUCCESS,
      response: response.data,
    });
    if (response.data === 'Stage Saved Successfully') {
      yield put({
        type: actions.GET_ALL_STAGES,
      });
    }
  } catch (e) {
    yield put({
      type: actions.ADD_NEW_STAGE_FAILURE,
      error: e,
    });
  }
}
