import React, {useContext} from 'react';
import ContactContext from '../../context/contact/contactContext'
import { FiPhoneCall } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";


const ContactItem = (props) => {

    const contactContext = useContext(ContactContext);
    const {deleteContact, setCurrent, clearCurrent} = contactContext;

    const onClickDelete = (_id) => {
        deleteContact(_id);
        clearCurrent();
    }
    const onClickEdit = (singleContact) => {
        setCurrent(singleContact);
    }
    
    const {_id, name, email, phone, type} = props.singleContact;
    return(
        <div className="singleContactItem">
                <h3 className="contact-name"><AiOutlineUser className="icon"/>{' '}{name}</h3>
                <h3 className="contact-phone"><FiPhoneCall className="icon"/>{' '}{phone}</h3>
                {  
                    email ? (<h3 className="contact-email"><AiOutlineMail className="icon"/>{' '}{email}</h3>) : (null)
                }
                {
                    <h3 className={`contact-type ${type === 'Personal' ? 'green' : 'red'}`}>{type}</h3>
                }
                <button onClick={() => onClickEdit(props.singleContact)} className="edit-btn">Edit</button>
                <button onClick={() => onClickDelete(_id)} className="delete-btn">Delete</button>
        </div>
        
    )
}

export default ContactItem;


// OR
// type === 'personal' ? <h3 className="contact-type green">{type}</h3> : <h3 className="contact-type red">{type}</h3>