import React, {useContext, useEffect} from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './contactItem';
import '../../App.css';

const Contact = () => {
    const contactContext = useContext(ContactContext);

    const {contacts, getContacts} = contactContext;    
    console.log('i ran out')
    useEffect(() => {
        getContacts();
        console.log('use Effect');
    }, [])


    return (
        <div className="contact-container">
        {
            contacts.map((singleContact) => (
                <ContactItem key={singleContact._id} singleContact = {singleContact}/>
            ))
        }
        </div>
    )
}

export default Contact;