import React, {useReducer} from 'react';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import axios from 'axios';
// import { v4 as uuidv4 } from 'uuid';

import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    UPDATE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    CONTACT_ERROR,
    CLEAR_CONTACTS
} from '../types';

const ContactState = (props) => {

const initialState = {
    contacts : [],
    current: null,
    error: null,
    filterContacts: null
}

const [state, dispatch] = useReducer(contactReducer, initialState);
const getContacts = async() => {
    try{
        const res = await axios.get('/api/contacts')
        dispatch({type: GET_CONTACTS, payload: res.data});
    }catch(err) {
        dispatch({type: CONTACT_ERROR, payload: err.response.data}) 
    }
}
const addContact = async(contact) => {
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    }
    try {
        const res = await axios.post('/api/contacts', contact, config) // the reason for not adding token here is its getting added in app.js. setToken() adds the token if its available in localStorage and puts in in global headers
        dispatch({type:ADD_CONTACT, payload: res.data});
    }catch(err) {
        dispatch({type:CONTACT_ERROR, payload: err.response.data});
    }
}

const deleteContact = async(_id) => {
    try {
        await axios.delete(`/api/contacts/${_id}`);
        dispatch({type:DELETE_CONTACT, payload: _id});
    }catch(err) {
        dispatch({type:CONTACT_ERROR, payload: err.response.data});
    }
}

const updateContact = async(contact) => {
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    }
    const res = await axios.put(`/api/contacts/${contact._id}`, contact, config)
    dispatch({type:UPDATE_CONTACT, payload: res.data});
}

const setCurrent = (contact) => {
    
    dispatch({type:SET_CURRENT, payload: contact});
}

const clearCurrent = () => {
    dispatch({type: CLEAR_CURRENT})
}

const clearContacts = () => {
    dispatch({type: CLEAR_CONTACTS})
}

return (
    <ContactContext.Provider value={{
        contacts: state.contacts,
        current: state.current,
        error: state.error,
        addContact,
        deleteContact,
        updateContact,
        setCurrent,
        clearCurrent,
        getContacts,
        clearContacts
    }}>
        {props.children}
    </ContactContext.Provider>
)

}

export default ContactState;