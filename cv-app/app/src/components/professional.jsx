import { useState } from 'react';
import Form from './form';
import Summary from './summary';
import '../styles/section.css';
import job from '../assets/suitcase.png';


function Professional({ info, setProfessional, submitProfessional }){
    const [ editing, setEditing ] = useState(true);

    function handleSubmit(e){
        e.preventDefault();
        const title = document.getElementById('JobTitle').value;
        const company = document.getElementById('Company').value;
        const startDate = document.getElementById('StartDate').value;
        const endDate = document.getElementById('EndDate').value;
        const desc = document.getElementById('Description').value;

        const newObj = {
            JobTitle: title,
            Company: company,
            StartDate: startDate,
            EndDate: endDate,
            Description: desc
        }
        setProfessional(newObj);
        submitProfessional(true);

        setEditing(false);
    }

    function handleEdit(){
        setEditing(false);
    }

    return (
        <div className='container'>
            <div className='header'>
                <img src={job}></img>
                <h2>Professional Experience</h2>
            </div>
            {editing ? <Form info={info} handleSubmit={handleSubmit} /> : <Summary info={info} handleEdit={handleEdit} />}
        </div>
    )
}

export default Professional;