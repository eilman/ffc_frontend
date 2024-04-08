import axios from 'axios';
import * as actionTypes from './actionTypes';

export const setUserDetails = userData => ({
    type: actionTypes.SET_USER_DETAILS,
    userData,
});

export const getUserDetails = (userId) => {
    return dispatch => {
        axios.interceptors.request.use(function (config) {
            console.log("Request URL:", config.url); // URL'yi konsola yazdırıyoruz
            return config;
        }, function (error) {
            return Promise.reject(error);
        });
        
        axios
            .get(`http://localhost:8081/ffc/getUser/${userId}`)
            .then(response => {
                dispatch(setUserDetails(response.data));
            })
            .catch(err => {
                console.log("getUserDetails error !!!");
            });
    };
};