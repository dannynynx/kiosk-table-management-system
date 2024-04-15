import "./AccountCreationPopUp.css";
import PropTypes from "prop-types";
import { useState } from 'react';
import { Link } from "react-router-dom";

const AccountCreationPopUp = (props) => {
    const [formData, setFormData] = useState({ username: '', password: '', logoutCode: '', role: ''});
    const [textColor, setTextColor] = useState('#000000');
    const [codeText, setCodeText] = useState('Logout Code:');

    const popupClassName = "account-creation-popup" + (props.isPopUpVisible ? " visible" : "");

    const handleSubmit = () => {
        const regex = /^\d{4}$/;

        if (formData.username === '' || formData.password === '' || formData.logoutCode === '' || formData.role === '') {
            setTextColor('#d33d3d')
        }
        else if (!regex.test(formData.logoutCode)) {
            setTextColor('#d33d3d')
            setCodeText('Logout Code: Code must be a 4-digit number')
        }
        else {
            setTextColor('#000000')
            setCodeText('Logout Code:')
            props.onClose();
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    return (
        <>
        <div className={popupClassName} >
            <div className="account-creation-container">
                <h1 className="account-creation-title">Create Account</h1>
                <h1 style={{ color: textColor }}>Username:</h1>
                <input type="text" className="account-creation-text-box" id='username' name="username" onChange={handleChange}/>
                <h1 style={{ color: textColor }}>Password:</h1>
                <input type="text" className="account-creation-text-box" id='password' name="password" onChange={handleChange}/>
                <h1 style={{ color: textColor }}>{codeText}</h1>
                <input type="number" className="account-creation-text-box" id='logout-code' name="logoutCode" onChange={handleChange}/>
                <h1 style={{ color: textColor }}>Role:</h1>
                <input type="text" className="account-creation-text-box" id='role' name="role" onChange={handleChange}/>
                <div className="account-creation-button-div">
                    <input type="button" className="account-creation-button" value="Go Back" onClick={props.onClose}/>
                    <input type="button" className="account-creation-button" value="Create Account" onClick={handleSubmit}/>
                </div>
            </div>
        </div>
    </>)
}

AccountCreationPopUp.propTypes = {
    isPopUpVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default AccountCreationPopUp;