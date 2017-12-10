export const SET_SERVICES = 'SET_SERVICES';
export const SET_SERVICE = 'SET_SERVICE';
export const SET_NODES = 'SET_NODES';
export const SET_LOGS = 'SET_LOGS';
export const SET_LOGS_EXPORT = 'SET_LOGS_EXPORT';
export const SET_LOGS_EXPORT_LOADING = 'SET_LOGS_EXPORT_LOADING';

const initialState = {
  services: [],
  service: {},
  nodes: [],
  logs: '',
  exportLogs: '',
  exportLogsLoading: false
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
    case SET_LOGS_EXPORT : {
      return {...state, exportLogs: payload};
    }
    case SET_LOGS_EXPORT_LOADING : {
      return {...state, exportLogsLoading: payload};
    }
    default:
      return state;
  }
};