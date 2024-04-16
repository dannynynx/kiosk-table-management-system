import "./AccountEditPopUp.css";
import PropTypes from "prop-types";
import { useState } from 'react';
import axios from 'axios';

const AccountEditPopUp = (props) => {
    const [formData, setFormData] = useState({ id: props.id, username: props.username, password: props.password, logoutCode: props.code, role: props.role});
    const [textColor, setTextColor] = useState('#000000');
    const [codeText, setCodeText] = useState('Logout Code:');
    const [usernameText, setUsernameText] = useState('Username:')

    const popupClassName = "account-edit-popup" + (props.isPopUpVisible ? " visible" : "");

    const handleSubmit = async () => {
        const regex = /^\d{4}$/;
        console.log(formData)
        if (formData.username === '' || formData.password === '' || formData.logoutCode === '') {
            setTextColor('#d33d3d')
        }
        else if (!regex.test(formData.logoutCode)) {
            setTextColor('#d33d3d')
            setCodeText('Logout Code: Code must be a 4-digit number')
        }
        else {
            try {
                console.log(formData.id)
                const newData = { id: formData.id, username: formData.username, password: formData.password, role: formData.role, logout_code: formData.logoutCode}
                const response = await axios.put( 'http://127.0.0.1:5000/manager/edit_account', newData);
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
            <div className="account-edit-container">
                <h1 className="account-edit-title">Edit Account ID:{formData.id}</h1>
                <h1 style={{ color: textColor }}>{usernameText}</h1>
                <input type="text" className="account-edit-text-box" id='username' name="username" value={formData.username} onChange={handleChange}/>
                <h1 style={{ color: textColor }}>Password:</h1>
                <input type="text" className="account-edit-text-box" id='password' name="password" value={formData.password} onChange={handleChange}/>
                <h1 style={{ color: textColor }}>{codeText}</h1>
                <input type="number" className="account-edit-text-box" id='logout-code' name="logoutCode" value={formData.logoutCode} onChange={handleChange}/>
                <h1 style={{ color: textColor }}>Role:</h1>
                <div className="account-edit-text-box">{formData.role}</div>
                <div className="account-edit-button-div">
                    <input type="button" className="account-edit-button" value="Go Back" onClick={props.onClose}/>
                    <input type="button" className="account-edit-button" value="Save Changes" onClick={handleSubmit}/>
                </div>
            </div>
        </div>
    </>)
}

AccountEditPopUp.propTypes = {
    isPopUpVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
};

export default AccountEditPopUp;