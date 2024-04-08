import * as actionTypes from '../actions/actionTypes';

const initialState = [];

const setUserList = action => action.userListData;

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_USERS:
            return setUserList(action);
        default:
            return state;
        }
};

export default reducer;