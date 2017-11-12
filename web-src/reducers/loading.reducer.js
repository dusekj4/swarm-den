export const SET_LOADING_STATUS = 'SET_LOADING_STATUS';

const initialState = {
  isLoading: false,
};


export const loadingReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_LOADING_STATUS: {
      return {...state, isLoading: payload};
    }
    default:
      return state;
  }
};