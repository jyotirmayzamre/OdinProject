import { useState } from "react";

import Form from "./form";
import Summary from "./summary";

import "../styles/section.css";
import grad from "../assets/graduation.png";


function Education({ info, setEducational, submitEducational }){
    const [ editing, setEditing ] = useState(true);

    function handleSubmit(e){
        e.preventDefault();
        const degree = document.getElementById('Degree').value;
        const university = document.getElementById('University').value;
        const city = document.getElementById('City').value;
        const country  = document.getElementById('Country').value;
        const startDate = document.getElementById('StartDate').value;
        const endDate = document.getElementById('EndDate').value;

        const newObj = {
            Degree: degree,
            University: university,
            City: city,
            Country: country,
            StartDate: startDate,
            EndDate: endDate
        }
        
        setEducational(newObj);
        submitEducational(true);
        setEditing(false);
    }

    function handleEdit(){
        setEditing(true);
    }

    return (
        <div className="container">
            <div className="header">
                <img src={grad}></img>
                <h2>Education Experience</h2>
            </div>
            {editing ? <Form info={info} handleSubmit={handleSubmit}/> : <Summary info={info} handleEdit={handleEdit} />}
        </div>
    )  
}

export default Education;