import * as actionTypes from '../actions/actionTypes';

const initialState = [];

const setUserDetails = action => action.userDetails;

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_USER_DETAILS:
            return setUserDetails(action);
        default:
            return state;
        }
};

export default reducer;