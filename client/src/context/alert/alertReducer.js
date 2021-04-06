import {
    SET_ALERT, REMOVE_ALERT
} from '../types';


export default (state, action) => {

switch(action.type) {
    case SET_ALERT:
        return [...state, action.payload]
    case REMOVE_ALERT: 
    const removeAlert = state.filter((singleAlert) => {
        return singleAlert.id !== action.payload
        }) 
        return removeAlert;
    default: 
        return {
            state
        }
}



}