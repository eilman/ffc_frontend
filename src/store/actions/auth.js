import axios from 'axios';
import * as actionTypes from './actionTypes';
import { getUserDetails } from './userActions';
import { useNavigate } from 'react-router-dom';

export const setUserId = userId => ({
    type: actionTypes.SET_USER_ID,
    userId,
});

export const auth = (userData) => {
    return dispatch => {
        axios.interceptors.request.use(function (config) {
            console.log("Request URL:", config.url);
            return config;
        }, function (error) {
            return Promise.reject(error);
        });
        
        axios
            .post('http://localhost:8081/ffc/login', userData)
            .then(response => {
                dispatch(setUserId(response.data));
                const currentUserId = response.data; 
                localStorage.setItem("isLoggedIn", true);
                dispatch(getUserDetails(currentUserId));
            })
            .catch(err => {
                console.log("auth error !!!");
            });
    };
};

export const resetState = () => {
    return {
      type: 'RESET_STATE'
    };
  };