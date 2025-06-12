import '../styles/cv.css';

function CV({ personal, educational, professional, submitPersonal, submitEducational, submitProfessional}){
    return (
        
        <div className="cv-container">
            {submitPersonal ? (
                <div id="personal-container" className='info'>
                    <h2 id='name'>{personal.Name}</h2>
                    <div id="personal-details">
                        <p>{personal.Email}</p>
                        <p>{personal.Phone}</p>
                        <p>{personal.Address}</p>
                    </div>
                </div>
            ) : null}

            {submitEducational ? (
                <div id="educational-container" className='info'>
                    <h2>Education</h2>
                    <div id='educational-details'>
                        <div className='small'>
                            <p style={{ fontWeight: 'bold' }}>{educational.Degree},</p>
                            <p style={{ fontStyle: 'italic' }}>{educational.University}</p>
                        </div>
                        <div className='col'>
                            <div className='small'>
                                <p>{educational.StartDate} - </p>
                                <p>{educational.EndDate}</p>
                            </div>
                            <div className='small'>
                                <p>{educational.City}, </p>
                                <p>{educational.Country}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ): null}

            {submitProfessional ? (
                <div id="professional-container" className='info'>
                    <h2>Professional Experience</h2>
                    <div id='professional-details'>
                        <div className='small'>
                            <p style={{ fontWeight:'bold' }}>{professional.JobTitle},</p>
                            <p style={{ fontStyle: 'italic'}}>{professional.Company}</p>
                        </div>
                        <div className='small'>
                            <p>{professional.StartDate} - </p>
                            <p>{professional.EndDate}</p>
                        </div>
                    </div>
                    <div>{professional.Description}</div>
                </div>
            ) : null}
            
            

            
        </div>
    )

}

export default CV;