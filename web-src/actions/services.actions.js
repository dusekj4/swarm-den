import axios from 'axios';
import {
  SET_SERVICES,
  SET_SERVICE,
  SET_NODES,
  SET_LOGS
} from '../reducers/services.reducer';
import {SET_LOADING_STATUS} from '../reducers/loading.reducer';

export const loadServicesAction = () => async (dispatch) => {
    try {
        dispatch({type: SET_LOADING_STATUS, payload: true});
        const result = await axios.get('/services');
        dispatch({type: SET_SERVICES, payload: result.data});
        dispatch({type: SET_LOADING_STATUS, payload: false});
    } catch (e) {
        dispatch({type: SET_LOADING_STATUS, payload: false});
    }
};

export const loadServiceAction = (serviceName) => async (dispatch) => {
    try {
        dispatch({type: SET_LOADING_STATUS, payload: true});
        const result = await axios.get(`/service/${serviceName}`);
        dispatch({type: SET_SERVICE, payload: result.data});
        dispatch({type: SET_LOADING_STATUS, payload: false});
    } catch (e) {
        dispatch({type: SET_LOADING_STATUS, payload: false});
    }
};

export const loadNodesAction = () => async (dispatch) => {
    try {
        dispatch({type: SET_LOADING_STATUS, payload: true});
        const result = await axios.get(`/get-nodes`);
        dispatch({type: SET_NODES, payload: result.data});
        dispatch({type: SET_LOADING_STATUS, payload: false});
    } catch (e) {
        dispatch({type: SET_LOADING_STATUS, payload: false});
    }
};

export const loadLogsAction = (serviceName, timestamp, tail) => async (dispatch) => {
    try {
        dispatch({type: SET_LOADING_STATUS, payload: true});
        const result = await axios.get(`/get-logs/${serviceName}/${timestamp}/${tail}/true`);
        dispatch({type: SET_LOGS, payload: result.data.split('<br/>')});
        dispatch({type: SET_LOADING_STATUS, payload: false});
    } catch (e) {
        dispatch({type: SET_LOADING_STATUS, payload: false});
    }
};