import { useState } from "react";
import '../styles/input.css';


function Input({ id='', label='', text=''}){

    const [ value, setValue ] = useState(text);

    return (
        <div className="input">
            <label htmlFor={id}>{label}</label>
            <input id={id} type="text" value={value} onChange={(e) => setValue(e.target.value)} />

        </div>
    )
}

export default Input;