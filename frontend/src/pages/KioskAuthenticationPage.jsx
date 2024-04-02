import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import './KioskAuthenticationPage.css';

const KioskAuthenticationPage = () => {
    const [inputValue, setInputValue] = useState('');
    const [code, setCode] = useState(null);
    const navigate = useNavigate();
    const tableNumber = localStorage.getItem('tablenumber');

    const handleChange = (e) => {
        setInputValue(e.target.value);
    } 

    const handleSubmit = async () => {
        const message = await authenticateCode(tableNumber, inputValue)
        if (message !== null) {
            navigate('/menu');
        }  
    };

    useEffect(() => {
        console.log(tableNumber)
        getTableCode(tableNumber)
    }, [])

    const getTableCode = async (tableNumber)=> {
        try {
            const data = {'table_id': tableNumber}
            console.log(data)
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
            console.log(data)
            const response = await axios.post( 'http://127.0.0.1:5000/customer/table_authentication', data)
            const rawCode = response.data;
            return rawCode;
        } catch(error) {
            console.error('Error submitting data:', error);
            return null;
        }
    }

    return (
        <>
            <div className='container'>
                <div className='box-container'>
                    <p className='authentication-title'>Blue Zebra</p>
                    <p className='text-description'>Please Type the four-digit code here:</p>
                    <input type="text" className='code-input' onChange={handleChange}/>
                    <input type="button" className='code-confirmation' value='Confirm' onClick={handleSubmit}/>
                </div>
            </div>
        </>
    );
};

export default KioskAuthenticationPage;
