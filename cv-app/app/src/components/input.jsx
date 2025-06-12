import { useState } from "react";
import '../styles/input.css';


function Input({ id='', label='', type='', placeholder='', text=''}){

    const [ value, setValue ] = useState(text);

    return (
        <div className="input">
            <label htmlFor={id}>{label}</label>
            <input id={id} type={type} value={value} placeholder={placeholder} onChange={(e) => setValue(e.target.value)} required/>

        </div>
    )
}

export default Input;