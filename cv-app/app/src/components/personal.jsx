import { useState } from 'react';
import Form from './form';
import Summary from './summary';
import '../styles/section.css'
import user from '../assets/user.png';

function Personal({ info, setPersonal, submitPersonal }){
    //need states for if editing or not and the info details
    const [ editing, setEditing ] = useState(true);

    function handleSubmit(e){
        e.preventDefault();
        const name = document.getElementById('Name').value;
        const email = document.getElementById('Email').value;
        const phone = document.getElementById('Phone').value;
        const location = document.getElementById('Address').value;

        const newObj = {
            Name: name,
            Email: email,
            Phone: phone,
            Address: location
        }

        setPersonal(newObj);
        submitPersonal(true);

        setEditing(false);
    }

    function handleEdit(){
        setEditing(true);
    }
    return (
        <div className='container'>
            <div className='header'>
                <img src={user}></img>
                <h2>General Information</h2>
            </div>
            {editing ?  <Form info={info} handleSubmit={handleSubmit}/>: <Summary info={info} handleEdit={handleEdit} />}

        </div>
    )
    
}

export default Personal;