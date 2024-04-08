import axios from 'axios';
import * as actionTypes from './actionTypes';

export const setUserList = userListData => ({
    type: actionTypes.SET_USERS,
    userListData,
});

export const getUserList = () => {
    return dispatch => {
        axios.interceptors.request.use(function (config) {
            console.log("Request URL:", config.url); // URL'yi konsola yazdırıyoruz
            return config;
        }, function (error) {
            return Promise.reject(error);
        });
        
        axios
            .get('http://localhost:8081/ffc/users')
            .then(response => {
                dispatch(setUserList(response.data));
            })
            .catch(err => {
                console.log("getUserList error !!!");
            });
    };
};