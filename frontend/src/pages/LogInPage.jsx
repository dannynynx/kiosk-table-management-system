import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './LogInPage.css';

const LogInPage = () => {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const response = await axios.post( 'http://127.0.0.1:5000/staff/staff_authentication', formData);
            const { role } = response.data;
            console.log(role);
            localStorage.setItem('tablenumber', role)
            navigate('/kiosk/authentication');
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className='container'>
                <form className='login-form'>
                    <h2 className='login-main-text'><b>Blue Zebra</b></h2>
                    <p className='login-main-text'>Staff Login</p>
                    <p className='input-label'>USERNAME</p>
                    <input type='text' className='login-text-inputs' id='username' name='username' onChange={handleChange} />
                    <p className='input-label'>PASSWORD</p>
                    <input type='password' className='login-text-inputs' id='password' name='password' onChange={handleChange} />
                    <input type='button' className='login-button' value='Login' id='login-submit' onClick={handleSubmit} />
                </form>
            </div>
        </>
    );
};

export default LogInPage;