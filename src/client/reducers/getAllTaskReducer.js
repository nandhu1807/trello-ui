import actions from '../utils/actionTypes';

const initialState = {
  allTask: [],
  isLoading: false,
  error: '',
};

const getAllTaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_ALL_TASK:
      return Object.assign({}, state, { allTask: [], isLoading: true, error: '' });
    case actions.GET_ALL_TASK_SUCCESS:
      return Object.assign({}, state, { allTask: action.response, isLoading: false, error: '' });
    case actions.GET_ALL_TASK_FAILURE:
      return Object.assign({}, state, { allTask: [], isLoading: false, error: action.error });
    default:
      return state;
  }
};

export default getAllTaskReducer;
