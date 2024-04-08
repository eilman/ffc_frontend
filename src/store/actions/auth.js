import axios from 'axios';
import * as actionTypes from './actionTypes';

export const setUserDetails = userDetail => ({
    type: actionTypes.SET_USER_DETAILS,
    userDetail,
});

//!!
export const auth = (username, password) => {
    return dispatch => {
        axios.interceptors.request.use(function (config) {
            console.log("Request URL:", config.url);
            return config;
        }, function (error) {
            return Promise.reject(error);
        });
        
        axios
            .get('http://localhost:8081/ffc/login/${username}/${password}')
            .then(response => {
                dispatch(setUserDetails(response.data));
            })
            .catch(err => {
                console.log("auth error !!!");
            });
    };
};