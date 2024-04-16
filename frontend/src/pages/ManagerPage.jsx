import './ManagerPage.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PopUp from '../components/PopUp';
import settings from "../assets/settings.svg";

const ManagerPage = () => {
    const navigate = useNavigate();
    const [isPopUpVisible, setPopUpVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    // const role = localStorage.getItem('tablenumber');

    useEffect(() => {
        // if (role !== "manager") { 
        //     navigate('/login');
        // }
    }, [])


    const handleOpenStats = () => { 
        navigate('/manager/stats');
    }

    const handleOpenManagerMenu = () => { 
        navigate('/manager/menu');
    }

    const handleOpenSettings = () => { 
        navigate('/manager/settings');
        //can change to be popup
    }

    const handleEditAccounts =() => {
        navigate('/manager/accounts')
    }

    const closePopUp = () => {
        setPopUpVisible(false);
    };

    const handleLogout = () => {
        navigate('/logout');
    }

    return (
        <>
        <div className='manager-page'>
            <h1>Manager</h1>
            <div className='logout-btn' onClick={handleLogout}>Log Out</div>
            <div className='settings' onClick={handleOpenSettings}><img src={settings} alt='settings'/></div>
            <div className='manager-buttons'>
                <button onClick={handleOpenStats}>Stats</button>
                <button onClick={handleOpenManagerMenu}>Menu Customisation</button>
                <button onClick={handleEditAccounts}>Manage Accounts</button>
            </div>
        </div>
        {isPopUpVisible && (
                <PopUp message={popupMessage} onClose={closePopUp} isPopUpVisible={isPopUpVisible}/>
            )}
        </>
            
    );
};

export default ManagerPage;