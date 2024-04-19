import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import './KioskAuthenticationPage.css';

const KioskAuthenticationPage = () => {
    const [inputValue, setInputValue] = useState('');
    const [code, setCode] = useState(null);
    const navigate = useNavigate();
    const tableNumber = localStorage.getItem('tablenumber');
    const [textColor, setTextColor] = useState('#e7eaf9');
    const [textContent, setTextContent] = useState('Please Type the four-digit code here:');
    const [restaurantColour, getRestaurantColour] = useState("black")

    const handleChange = (e) => {
        setInputValue(e.target.value);
    } 

    const grabRestaurantColours = () => {
        axios.get('http://127.0.0.1:5000/manager/get_customisations')
        .then(response => {
            const data = response.data;
            getRestaurantColour(data.primary_colour)
        })
        .catch(error => {
            console.error('Error fetching customisation:', error);
        });
    }

    const handleSubmit = async () => {
        const message = await authenticateCode(tableNumber, inputValue)
        if (message !== null) {
            navigate('/menu');
        }  
    };

    useEffect(() => {
        getTableCode(tableNumber)
        grabRestaurantColours()
    }, [])

    const getTableCode = async (tableNumber)=> {
        try {
            const data = {'table_id': tableNumber}
            const response = await axios.get( `http://127.0.0.1:5000/customer/table_code?table_id=${tableNumber}`);
            const rawCode = response.data;
            setCode(rawCode)
        } catch (error) {
            console.error('Error submitting data:', error);
            return null;
        }
    }

    const authenticateCode = async (tableNumber, code) => {
        try {
            const data = {'table_id': tableNumber, 'code': code}
            const response = await axios.post( 'http://127.0.0.1:5000/customer/table_authentication', data)
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

export default KioskAuthenticationPage;
