import types from '../actions/types';

const initialState = {
  accessToken: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.auth.SET_ACCESS_TOKEN:
      return { ...state, accessToken: action.data };
    default:
      return state;
  }
};
