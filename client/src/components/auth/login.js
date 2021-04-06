import React,{useState, useContext, useEffect} from 'react';
import '../../App.css';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import { AiOutlineLogin } from "react-icons/ai";


const Login = (props) => {

    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);
    
    
    const [login, setLogin] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        if(authContext.isAuthenticated) {
            props.history.push('/');
        }
        if(authContext.error === 'Invalid Credentials'){
            alertContext.setAlert('Invalid Credentials', 'danger');
            authContext.clearError();
        }
    }, [authContext.error, authContext.isAuthenticated, props.history])

    const onFormSubmit = (e) => {
        e.preventDefault();
        if(login.email==='' || login.password===''){
            alertContext.setAlert('Please Enter all fields', 'danger');
        }
        else {
            authContext.login(login);
            setLogin({
                email: '',
                password: ''
            })
        }
    }

    const onChange = (e) => {
        setLogin({
            ...login, 
            [e.target.name] : e.target.value
        })
    }

return(
    <form onSubmit ={onFormSubmit} className="login-form">
        <h2><AiOutlineLogin className="icon"/>{' '}Login User</h2>
        <label>Email </label>
        <input type="text" name="email" onChange={onChange} value={login.email} />
        <br></br>
        <label>Password </label>
        <input type="password" name="password" onChange={onChange} value={login.password} />
        <br></br>
        <button className="btn-primary">Login</button>
    </form>
)

}

export default Login;