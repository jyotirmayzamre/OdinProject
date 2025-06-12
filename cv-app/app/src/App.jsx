//import { useState } from 'react'
import './App.css'
import Personal from './components/personal'
import Education from './components/education'
import Professional from './components/professional'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <div id='main-container'>
      <section>
        <Personal />
        <Education />
        <Professional />
      </section>
      <section id='cv'>
        This will contain the CV component.
      </section>
    </div>
  )
}

export default App
