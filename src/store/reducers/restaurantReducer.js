import * as actionTypes from '../actions/actionTypes';

const initialState = [];

const setRestaurants = action => action.restData;

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_RESTAURANTS:
            return setRestaurants(action);
        case 'RESET_STATE':
            return initialState;
        default:
            return state;
        }
};

export default reducer;