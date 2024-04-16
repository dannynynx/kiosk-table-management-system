import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './LogInPage.css';

const LogInPage = () => {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const [usernameTextColor, setUsernameTextColor] = useState('#e7eaf9');
    const [passwordTextColor, setPasswordTextColor] = useState('#e7eaf9');
    const [usernameText, setUsernameText] = useState('USERNAME');
    const [passwordText, setPasswordText] = useState('PASSWORD');

    const handleSubmit = async () => {
        try {
            const response = await axios.post( 'http://127.0.0.1:5000/staff/staff_authentication', formData);
            const role = response.data.role;
            localStorage.setItem('tablenumber', role)
        
            if (role == "kitchen") { 
                navigate('/kitchen');
            } else if (role == "wait") { 
                navigate('/waiter');
            } else if (role == 'manager') { 
                navigate('/manager');
            } else { 
                navigate('/kiosk/authentication');
            }


        } catch (error) {
            console.error('Error submitting data:', error);
            setUsernameTextColor('#d33d3d');
            setPasswordTextColor('#d33d3d');
            setUsernameText('USERNAME - Username or Password is invalid.');
            setPasswordText('PASSWORD - Username or Password is invalid.');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className='login-page-container'>
                <form className='login-page-login-form'>
                    <h2 className='login-main-text'><b>Blue Zebra</b></h2>
                    <p className='login-main-text'>Staff Login</p>
                    <p className='login-page-input-label' style={{ color: usernameTextColor }}>{usernameText}</p>
                    <input type='text' className='login-text-inputs' id='username' name='username' onChange={handleChange} />
                    <p className='input-label' style={{ color: passwordTextColor }}>{passwordText}</p>
                    <input type='password' className='login-text-inputs' id='password' name='password' onChange={handleChange} />
                    <input type='button' className='login-button' value='Login' id='login-submit' onClick={handleSubmit} />
                </form>
            </div>
        </>
    );
};

export default LogInPage;