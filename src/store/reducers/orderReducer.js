import * as actionTypes from '../actions/actionTypes';

const initialState = [];

const setOrders = action => action.orderData;

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_ORDERS:
            return setOrders(action);
        case 'RESET_STATE':
            return initialState;
        default:
            return state;
        }
};

export default reducer;