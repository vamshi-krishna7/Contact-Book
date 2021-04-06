import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import axios from 'axios';
import setAuthToken from '../../components/utils/setAuthToken';
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

const AuthState = (props) => {

    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,  
        user: null,
        error: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    const loadUser = async() => {
        if(localStorage.token){
            setAuthToken(localStorage.token)
        }
        
        try {
            const res = await axios.get('/api/auth');
            dispatch({type: LOAD_USER, payload: res.data})
        }catch(err) {
            dispatch({type: AUTH_ERROR})
        }
        
    }

    const registerUser = async(user) => {
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }

        try {
            const res = await axios.post('/api/users', user, config) // res === token
            dispatch({type: REGISTER_USER, payload: res.data})    // res.data === {token = "asdasfasfa"}
        }catch(err) {
            dispatch({type: REGISTER_FAIL, payload: err.response.data.msg})
        }

        loadUser();
    }

    const clearError = () => {
        dispatch({type:CLEAR_ERROR})
    }

    const login = async(login) => {

        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }
        try {
            const res = await axios.post('/api/auth', login, config)
            dispatch({type: LOGIN, payload: res.data})
        }catch(err) {
            dispatch({type: LOGIN_FAIL, payload: err.response.data.msg})
        }
        loadUser();
    }
    const logout = () => {
        dispatch({type: LOGOUT})
    }
    

    return(
        <AuthContext.Provider value={{ 
                token: state.token,
                isAuthenticated: state.token,
                loading: state.loading,
                user: state.user,
                error: state.error,
                registerUser,
                clearError,
                loadUser,
                login,
                logout
            }}>
            {props.children}
        </AuthContext.Provider>
        )

}


export default AuthState;