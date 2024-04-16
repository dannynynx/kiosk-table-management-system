import "./AccountCreationPopUp.css";
import PropTypes from "prop-types";
import { useState } from 'react';
import axios from 'axios';

const AccountCreationPopUp = (props) => {
    const [formData, setFormData] = useState({ username: '', password: '', logoutCode: '', role: ''});
    const [textColor, setTextColor] = useState('#000000');
    const [codeText, setCodeText] = useState('Logout Code:');
    const [usernameText, setUsernameText] = useState('Username:')

    const popupClassName = "account-creation-popup" + (props.isPopUpVisible ? " visible" : "");

    const handleSubmit = async () => {
        const regex = /^\d{4}$/;
        console.log(formData)
        if (formData.username === '' || formData.password === '' || formData.logoutCode === '' || formData.role === '') {
            setTextColor('#d33d3d')
        }
        else if (!regex.test(formData.logoutCode)) {
            setTextColor('#d33d3d')
            setCodeText('Logout Code: Code must be a 4-digit number')
        }
        else {
            try {
                const newData = { username: formData.username, password: formData.password, role: formData.role, logout_code: formData.logoutCode}
                const response = await axios.post( 'http://127.0.0.1:5000/manager/create_account', newData);
                console.log(response)
                props.onClose();
            } catch (error) {
                setTextColor('#d33d3d')
                setUsernameText('Username: Username already taken')
            }
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
                <h1 style={{ color: textColor }}>{usernameText}</h1>
                <input type="text" className="account-creation-text-box" id='username' name="username" onChange={handleChange}/>
                <h1 style={{ color: textColor }}>Password:</h1>
                <input type="text" className="account-creation-text-box" id='password' name="password" onChange={handleChange}/>
                <h1 style={{ color: textColor }}>{codeText}</h1>
                <input type="number" className="account-creation-text-box" id='logout-code' name="logoutCode" onChange={handleChange}/>
                <h1 style={{ color: textColor }}>Role:</h1>
                <select className="account-creation-text-box" name="role" id="role" onChange={handleChange}>
                    <option value=""></option>
                    <option value="wait">Wait Staff</option>
                    <option value="kitchen">Kitchen Staff</option>
                </select>
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