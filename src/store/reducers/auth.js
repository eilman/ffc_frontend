import * as actionTypes from '../actions/actionTypes';

const initialState = [];

const setUserId = action => action.userDetails;

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_USER_ID:
            return setUserId(action);
        case 'RESET_STATE':
            return initialState;
        default:
            return state;
        }
};

export default reducer;