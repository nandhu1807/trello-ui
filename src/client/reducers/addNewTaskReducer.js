import actions from '../utils/actionTypes';

const initialState = {
  successMsg: '',
  isLoading: false,
  error: '',
};

const addNewTaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_NEW_TASK:
      return Object.assign({}, state, { successMsg: '', isLoading: true, error: '' });
    case actions.ADD_NEW_TASK_SUCCESS:
      return Object.assign({}, state, { successMsg: action.response, isLoading: false, error: '' });
    case actions.ADD_NEW_TASK_FAILURE:
      return Object.assign({}, state, { successMsg: '', isLoading: false, error: action.error });
    case actions.CLEAR_ADD_NEW_TASK_MESSAGE:
      return Object.assign({}, state, { successMsg: '', isLoading: false, error: '' });
    default:
      return state;
  }
};

export default addNewTaskReducer;
