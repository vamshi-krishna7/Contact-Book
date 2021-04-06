import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import ContactState from './context/contact/contactState';
import AuthState from './context/auth/authState';
import AlertState from './context/alert/alertState';

ReactDOM.render(
    <AuthState>
        <AlertState>
            <ContactState>
                <App/>
            </ContactState>
        </AlertState>
    </AuthState>,
    document.querySelector('#root')
);