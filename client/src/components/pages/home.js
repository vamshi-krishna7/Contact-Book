import React, {useContext, useEffect} from 'react';
import Contact from '../contacts/contact';
import ContactForm from '../contacts/contactForm';
import AuthContext from '../../context/auth/authContext';

const Home = () => {

const authContext = useContext(AuthContext);

useEffect(() => {
    authContext.loadUser();
}, [])

    return (
        <div className="home-section">
            <ContactForm/>
            <Contact />
        </div>
    )
}

export default Home;