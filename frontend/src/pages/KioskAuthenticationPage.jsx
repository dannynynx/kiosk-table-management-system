import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import './KioskAuthenticationPage.css';

const KioskAuthenticationPage = () => {

    return (
        <>
            <div className='container'>
                <div className='box-container'>
                    <p className='kiosk-title'>Blue Zebra</p>
                    <p className='text-description'>Please Type the four-digit code here:</p>
                    <input type="text" className='code-input' />
                    <input type="button" className='code-confirmation' value='Confirm'/>
                </div>
            </div>
        </>
    );
};

export default KioskAuthenticationPage;