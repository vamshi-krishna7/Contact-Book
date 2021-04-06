import {
    REGISTER_USER,
    REGISTER_FAIL,
    CLEAR_ERROR,
    LOAD_USER,
    AUTH_ERROR,
    LOGIN,
    LOGIN_FAIL,
    LOGOUT
} from '../types';

export default (state, action) => {
    switch(action.type){
        case REGISTER_USER:
        case LOGIN:
            localStorage.setItem('token', action.payload.token); // this will set the token in the browser
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_FAIL :
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
                localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: null,
                user: null,
                error: action.payload 
            }
        case CLEAR_ERROR: 
            return {
                ...state,
                error: null
            }
        case LOAD_USER:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                loading: false
            }
        default :
            return {
                state
            }
    }
}