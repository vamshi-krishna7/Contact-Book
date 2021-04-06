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


export default (state, action) => {  
    switch(action.type) {
        case GET_CONTACTS:
            return{
                ...state,
                contacts: action.payload
            }
    case ADD_CONTACT:
        return {
            ...state,
            contacts : [...state.contacts, action.payload]
        }
    case DELETE_CONTACT:
            const updatedContacts = state.contacts.filter((singleContact) => {
                return singleContact._id !== action.payload
            })
        return {
            ...state,
            contacts: updatedContacts
        }
    case UPDATE_CONTACT:
            const updatedContact = state.contacts.map((singleContact) => {
                return (singleContact._id === action.payload._id ? action.payload : singleContact)
            }) 
        return {
            ...state,
            contacts: [...updatedContact]
        }
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            }
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null,
            }
        case CLEAR_CONTACTS:
            return {
                ...state,
                current: null,
                contacts: []
            }
        case CONTACT_ERROR:
            return {
                ...state,
                error: action.payload
            }
    default:
        return {
            state
        }
    }
}