import { useState, useRef } from "react";
import { useFormStatus } from 'react-dom';

function Register(){

    const emailRef = useRef(null);
    const passwordRef= useRef(null);
    const confPasswordRef = useRef(null)
    
    const { pending } = useFormStatus();

    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            confirm_password: confPasswordRef.current.value
        }

        try {
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            })

            const data = await response.json();

            if(!response.ok){
                console.log(data.errors);
                setErrors(data.errors);
            } else {
                setErrors([]);
                console.log(data.user);
                emailRef.current.value = '';
                passwordRef.current.value = '';
                confPasswordRef.current.value = '';
            }
        } catch(err){
            console.error(err);
        }
    }

    return <>
        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            {errors.length > 0 && (
                <div>
                    <ul>
                        {errors.map((err, idx) => {
                            <li key={idx}>{err}</li>
                        })}
                    </ul>
                </div>
            )}
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required ref={emailRef}/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" minLength={3} ref={passwordRef} />
                <label htmlFor="confirm_password">Confirm Password</label>
                <input type="password" id="confirm_password" name="confirm_password" minLength={3} required ref={confPasswordRef} />
                <button type="submit" disabled={pending}>
                    {pending ? "Submitting..." : "Submit"}
                </button>
            </div>
        </form>
    
    </>
}

export default Register;