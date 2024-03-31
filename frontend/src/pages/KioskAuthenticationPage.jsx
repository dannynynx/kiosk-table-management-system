import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom"
import './KioskAuthenticationPage.css';

const KioskAuthenticationPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        navigate('/menu', {state: {tablenumber: location.state.tablenumber}});
    };

    return (
        <>
            <div className='container'>
                <div className='box-container'>
                    <p className='authentication-title'>Blue Zebra</p>
                    <p className='text-description'>Please Type the four-digit code here:</p>
                    <input type="text" className='code-input' />
                    <input type="button" className='code-confirmation' value='Confirm'  onClick={handleSubmit}/>
                </div>
            </div>
        </>
    );
};

export default KioskAuthenticationPage;