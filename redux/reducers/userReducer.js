import types from '../actions/types';

const initialState = {
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.user.SET_USER:
      return { ...state, ...action.data };
    default:
      return state;
  }
};
