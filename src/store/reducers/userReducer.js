import * as actionTypes from '../actions/actionTypes';

const initialState = [];

const setUserDetails = action => action.userData;

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_USER_DETAILS:
            return setUserDetails(action);
        case 'RESET_STATE':
            return initialState;
        default:
            return state;
        }
};

export default reducer;