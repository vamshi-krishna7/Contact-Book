import React, {useContext, useState, useEffect} from 'react';
import ContactContext from '../../context/contact/contactContext';


const ContactForm = () => {

    const contactContext = useContext(ContactContext);
    const {addContact, current, updateContact, clearCurrent} = contactContext;
    
    const [contact, setContact] = useState({
        name: '',
        phone: '',
        email: '',
        type: 'personal'
    });
    useEffect(() => {
    
        if(current !== null) {
            setContact(current)    // currrent === singleContact , current.id is also put in contact
        }else {
            setContact({
                name: '',
                phone: '',
                email: '',
                type: 'Personal'
            })
        }
    }, [contactContext, current])

    const onChange = (e) => {
    setContact({
        ...contact,
        [e.target.name] : e.target.value

    }) 
    }

    const onFormSubmit = (e) => {
    e.preventDefault();

    if(current === null){
        addContact(contact); // id will get added later by addContact in contextState(uuid)
    }
    else {
        updateContact(contact);  // id will come current
    }
    setContact({
                name: '',
                phone: '',
                email: '',
                type: 'personal'
    })
    clearCurrent();
    }



    return (
        <form className="contact-form-container" onSubmit={onFormSubmit}>
            <h2>{current !== null ? 'Update Contact' : 'Add Contact'}</h2>
            <label>Name</label>
            <input type="text" name="name" onChange={onChange} value={contact.name}/>  
            <br></br>
            <label>Phone</label>
            <input type="text" name="phone" onChange={onChange} value={contact.phone}/>
            <br></br>
            <label>Email</label>
            <input type="text" name="email" onChange={onChange} value={contact.email} />
            <br></br>
            <div>
            <label>Type: </label>
            <input type="radio" name="type" onChange={onChange} value="Personal" checked={contact.type === 'Personal'}/>{'' }Personal
            <input type="radio" name="type" onChange={onChange} value="Professional" checked={contact.type === 'Professional'}/>{' '}Professional
            </div>
            
            <br></br>
            <button className="btn-primary">{current !== null ? 'update Contact' :"Add contact"}</button> 
        </form>
        )
}

export default ContactForm;