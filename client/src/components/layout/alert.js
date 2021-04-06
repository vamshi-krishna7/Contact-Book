import React, {useContext} from 'react';
import AlertContext from '../../context/alert/alertContext';
import '../../App.css';

const Alert = () => {

    const alertContext = useContext(AlertContext);

    return(
        alertContext.state.length > 0 && alertContext.state.map((singleAlert) => (
                <h3 key={singleAlert.id} className={`message ${singleAlert.type}`}>{singleAlert.msg}</h3>
        )
    ))
}

export default Alert;