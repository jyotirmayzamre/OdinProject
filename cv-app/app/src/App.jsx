//import { useState } from 'react'
import './App.css'
import Personal from './components/personal'
import Education from './components/education'
import Professional from './components/professional';
import CV from './components/cv';
import { useState } from 'react';


function App() {
  //const [count, setCount] = useState(0)
  const [ personal, setPersonal ] = useState({Name: '', Email: '', Phone: '', Address: ''});
  const [ educational, setEducational ] = useState({Degree: '', University: '', City: '', Country: '', StartDate: '', EndDate: ''});
  const [ professional, setProfessional ] = useState({JobTitle: '', Company: '', StartDate: '', EndDate: '', Description: ''});

  const [ personalSubmitted, setPersonalSubmitted ] = useState(false);
  const [ educationalSubmitted, setEducationalSubmitted ] = useState(false);
  const [ professionalSubmitted, setProfessionalSubmitted ] = useState(false);

  return (
    <div id='main-container'>
      <div id='details'>
          <Personal info={personal} setPersonal={setPersonal} submitPersonal={setPersonalSubmitted}/>
          <Education info={educational} setEducational={setEducational} submitEducational={setEducationalSubmitted}/>
          <Professional info={professional} setProfessional={setProfessional} submitProfessional={setProfessionalSubmitted}/>
      </div>
      <div id='cv'>
        <CV personal={personal} educational={educational} professional={professional} submitPersonal={personalSubmitted} submitEducational={educationalSubmitted} submitProfessional={professionalSubmitted}/>
      </div>
    </div>
  )
}

export default App
