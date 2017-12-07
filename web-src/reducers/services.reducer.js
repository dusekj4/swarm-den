export const SET_SERVICES = 'SET_SERVICES';
export const SET_SERVICE = 'SET_SERVICE';
export const SET_NODES = 'SET_NODES';
export const SET_LOGS = 'SET_LOGS';

const initialState = {
  services: [],
  service: {},
  nodes: [],
  logs: ''
};


export const servicesReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_SERVICES: {
      return {...state, services: payload};
    }
    case SET_SERVICE: {
      return {...state, service: payload};
    }
    case SET_NODES: {
      return {...state, nodes: payload};
    }
    case SET_LOGS: {
      return {...state, logs: payload};
    }
    default:
      return state;
  }
};