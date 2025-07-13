import { useState } from "react";

function Register(){

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirm_password: ''
    });

    const [errors, setErrors] = useState([])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async () => {
        const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        })

        if(!response.ok){
            const errorData = await response.json();
            setErrors(errorData.errors);
        } else {
            setErrors([]);
            setFormData({ email: '', password: '', confirm_password: ''})
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
                <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange}/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" minLength={3} required value={formData.password} onChange={handleChange}/>
                <label htmlFor="confirm_password">Confirm Password</label>
                <input type="password" id="confirm_password" name="confirm_password" minLength={3} required value={formData.confirm_password} onChange={handleChange}/>
                <button type="submit">Register</button>
            </div>
        </form>
    
    </>
}

export default Register;