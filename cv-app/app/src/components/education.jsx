import { useState } from "react";

import Form from "./form";
import Summary from "./summary";

import "../styles/section.css";
import grad from "../assets/graduation.png";


function Education(){
    const [ editing, setEditing ] = useState(true);
    const [ info, setInfo ] = useState({Degree: '', University: '', City: '', Country: '', StartDate: '', EndDate: ''});

    function handleSubmit(e){
        e.preventDefault();
        const degree = document.getElementById('Degree').value;
        const university = document.getElementById('University').value;
        const city = document.getElementById('City').value;
        const country  = document.getElementById('Country').value;
        const startDate = document.getElementById('StartDate').value;
        const endDate = document.getElementById('EndDate').value;
        
        setInfo({
            Degree: degree,
            University: university,
            City: city,
            Country: country,
            StartDate: startDate,
            EndDate: endDate
        });

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