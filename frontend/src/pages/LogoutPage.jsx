import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import './KioskAuthenticationPage.css';

const LogoutPage = () => {
    const [inputValue, setInputValue] = useState('');
    const code = localStorage.getItem('logout_code');
    const username = localStorage.getItem('username');
    const navigate = useNavigate();
    const [textColor, setTextColor] = useState('#e7eaf9');
    const [textContent, setTextContent] = useState('Please Type the logout code here:');
    const role = localStorage.getItem('role');
    const [restaurantColour, getRestaurantColour] = useState("black")

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/manager/get_customisations')
        .then(response => {
            const data = response.data;
            getRestaurantColour(data.primary_colour)
        })
        .catch(error => {
            console.error('Error fetching customisation:', error);
        });
    }, [getRestaurantColour]);

    const handleChange = (e) => {
        setInputValue(e.target.value);
    } 

    const handleSubmit = async () => {
        const message = await authenticateCode();
        if (message !== null) {
            navigate('/login');
        }  
    };

    const authenticateCode = async () => {
        try {
            const data = {'logout_code': inputValue, 'username': username}
            const response = await axios.post( 'http://127.0.0.1:5000/staff/tablet_logout', data)
            const rawCode = response.data;
            return rawCode;
        } catch(error) {
            console.error('Error submitting data:', error);
            setTextColor('#d33d3d');
            setTextContent('Try Again. Type the four-digit code here:');
            return null;
        }
    }

    return (
        <>
            <div className='kiosk-authentication-container'>
                <div className='kiosk-authentication-box-container' style={{ backgroundColor: restaurantColour }}>
                    <p className='kiosk-authentication-title'>Blue Zebra</p>
                    <p className='kiosk-authentication-text-description' style={{ color: textColor }}>{textContent}</p>
                    <input type="text" className='kiosk-authentication-code-input' onChange={handleChange} style={{ backgroundColor: restaurantColour }}/>
                    <input type="button" className='kiosk-authentication-code-confirmation' value='Confirm' onClick={handleSubmit} style={{ backgroundColor: restaurantColour }}/>
                </div>
            </div>
        </>
    );
};

export default LogoutPage;
