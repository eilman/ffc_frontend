import axios from 'axios';
import * as actionTypes from './actionTypes';

export const setRestaurants = restData => ({
    type: actionTypes.SET_RESTAURANTS,
    restData,
});

export const getRestaurants = () => {
    return dispatch => {
        axios.interceptors.request.use(function (config) {
            console.log("Request URL:", config.url); // URL'yi konsola yazdırıyoruz
            return config;
        }, function (error) {
            return Promise.reject(error);
        });
        
        axios
            .get('http://localhost:8081/ffc/restaurants')
            .then(response => {
                dispatch(setRestaurants(response.data));
            })
            .catch(err => {
                console.log("getRestaurant error !!!");
            });
    };
};

export const createRestaurant = (newData) => {
    return dispatch => {
        axios.interceptors.request.use(function (config) {
            console.log("Request URL:", config.url); // URL'yi konsola yazdırıyoruz
            return config;
        }, function (error) {
            return Promise.reject(error);
        });
        
        axios
            .post('http://localhost:8081/ffc/createRestaurant', newData)
            .then(response => {
                dispatch(getRestaurants());
            })
            .catch(err => {
                console.log("createRestaurant error !!!");
            });
    };
};

export const updateRestaurant = (restaurantId, updatedData) => {
    return dispatch => {
        axios.interceptors.request.use(function (config) {
            console.log("Request URL:", config.url); // URL'yi konsola yazdırıyoruz
            return config;
        }, function (error) {
            return Promise.reject(error);
        });
        
        axios
            .put(`http://localhost:8081/ffc/updateRestaurant/${restaurantId}`, updatedData)
            .then(response => {
                dispatch(getRestaurants());
            })
            .catch(err => {
                console.log("updateRestaurant error !!!");
            });
    };
};

export const deleteRestaurant = (restaurantId) => {
    return dispatch => {
        axios.interceptors.request.use(function (config) {
            console.log("Request URL:", config.url); // URL'yi konsola yazdırıyoruz
            return config;
        }, function (error) {
            return Promise.reject(error);
        });
        
        axios
            .delete(`http://localhost:8081/ffc/deleteRestaurant/${restaurantId}`)
            .then(response => {
                dispatch(getRestaurants());
            })
            .catch(err => {
                console.log("deleteRestaurant error !!!");
            });
    };
};