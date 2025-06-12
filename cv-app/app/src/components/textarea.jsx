import { useState } from "react";
import '../styles/input.css';


function Textarea({ id='', label='', placeholder='', text=''}){

    const [ value, setValue ] = useState(text);

    return (
        <div className="input">
            <label htmlFor={id}>{label}</label>
            <textarea id={id}  value={value} placeholder={placeholder} onChange={(e) => setValue(e.target.value)} />

        </div>
    )
}

export default Textarea;