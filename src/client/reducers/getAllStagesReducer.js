import actions from '../utils/actionTypes';

const initialState = {
  stages: [],
  isLoading: false,
  error: '',
};

const getAllStagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_ALL_STAGES:
      return Object.assign({}, state, { stages: [], isLoading: true, error: '' });
    case actions.GET_ALL_STAGES_SUCCESS:
      return Object.assign({}, state, { stages: action.response, isLoading: false, error: '' });
    case actions.GET_ALL_STAGES_FAILURE:
      return Object.assign({}, state, { stages: action.response, isLoading: false, error: '' });
    default:
      return state;
  }
};

export default getAllStagesReducer;
