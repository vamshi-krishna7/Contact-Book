import React,{useState, useContext, useEffect} from 'react';
import '../../App.css';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import { RiAccountPinCircleFill } from "react-icons/ri";

const Register = (props) => {

    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    useEffect(() => {
        if(authContext.isAuthenticated){
            props.history.push('/');
        }
        if(authContext.error !== null){
            alertContext.setAlert(authContext.error, 'danger');
            authContext.clearError();
        }
    }, [authContext.error, authContext.isAuthenticated, props.history])

    const onFormSubmit = (e) => {
        e.preventDefault();
        if(user.name === '' || user.email === '' || user.password === '' || user.password2 === '') {
            alertContext.setAlert('please include all fields', 'danger');
        }
        else if(user.password.length < 6 || user.password2.length < 6){
            alertContext.setAlert('Password must be atleast 6 characters in length', 'warning');
        }
        else if(user.password !== user.password2){
            alertContext.setAlert('Passwords dont match', 'danger');
        }
        else {
            const {name, email, password} = user   // not sending password 2
            authContext.registerUser({name, email, password});
        }
    }

    const onChange = (e) => {
        setUser({
            ...user, 
            [e.target.name] : e.target.value
        })
    }

return(
    <form onSubmit ={onFormSubmit} className="register-form">
        <h2><RiAccountPinCircleFill className="icon"/>{' '}Account Register</h2>
        <label>Name </label>
        <input type="text" name="name" onChange={onChange} value={user.name} />
        <br></br>
        <label>Email </label>
        <input type="text" name="email" onChange={onChange} value={user.email} />
        <br></br>
        <label>Password </label>
        <input type="password" name="password" onChange={onChange} value={user.password} />
        <br></br>
        <label>Confirm-password </label>
        <input type="password" name="password2" onChange={onChange} value={user.password2} />
        <br></br>
        <button className="btn-primary">Register</button>
    </form>
)

}

export default Register;