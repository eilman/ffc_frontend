import axios from 'axios';
import * as actionTypes from './actionTypes';

export const setOrders = orderData => ({
    type: actionTypes.SET_ORDERS,
    orderData,
});

export const getOrders = () => {
    return dispatch => {
        axios.interceptors.request.use(function (config) {
            console.log("Request URL:", config.url); 
            return config;
        }, function (error) {
            return Promise.reject(error);
        });
        
        axios
            .get('http://localhost:8081/ffc/orders')
            .then(response => {
                dispatch(setOrders(response.data));
            })
            .catch(err => {
                console.log("getOrder error !!!");
            });
    };
};

export const createOrder = (userId, newData) => {
    return dispatch => {
        axios.interceptors.request.use(function (config) {
            console.log("Request URL:", config.url); 
            return config;
        }, function (error) {
            return Promise.reject(error);
        });
        
        axios
            .post(`http://localhost:8081/ffc/createOrder/${userId}`, newData)
            .then(response => {
                dispatch(getOrders());
            })
            .catch(err => {
                console.log("createOrder error !!!");
            });
    };
};

export const updateOrder = (orderId, updatedData) => {
    return dispatch => {
        axios.interceptors.request.use(function (config) {
            console.log("Request URL:", config.url); 
            return config;
        }, function (error) {
            return Promise.reject(error);
        });
        
        axios
            .put(`http://localhost:8081/ffc/updateOrder/${orderId}`, updatedData)
            .then(response => {
                dispatch(getOrders());
            })
            .catch(err => {
                console.log("updateOrder error !!!");
            });
    };
};

export const deleteOrder = (orderId) => {
    return dispatch => {
        axios.interceptors.request.use(function (config) {
            console.log("Request URL:", config.url); 
            return config;
        }, function (error) {
            return Promise.reject(error);
        });
        
        axios
            .delete(`http://localhost:8081/ffc/deleteOrder/${orderId}`)
            .then(response => {
                dispatch(getOrders());
            })
            .catch(err => {
                console.log("deleteOrder error !!!");
            });
    };
};