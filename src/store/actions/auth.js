import axios from 'axios';
import * as actionTypes from './actionTypes';

export const setUserId = userId => ({
    type: actionTypes.SET_USER_DETAILS,
    userId,
});

export const auth = (username, password) => {
    return dispatch => {
        axios.interceptors.request.use(function (config) {
            console.log("Request URL:", config.url);
            return config;
        }, function (error) {
            return Promise.reject(error);
        });
        
        axios
            .post('http://localhost:8081/ffc/login', { username: username, password: password })
            .then(response => {
                dispatch(setUserId(response.data));
            })
            .catch(err => {
                console.log("auth error !!!");
            });
    };
};