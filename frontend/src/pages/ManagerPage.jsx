import './ManagerPage.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PopUp from '../components/PopUp';

const ManagerPage = () => {
    const navigate = useNavigate();
    const [isPopUpVisible, setPopUpVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");


    const handleOpenStats = () => { 
        navigate('/manager/stats');
    }

    const handleOpenManagerMenu = () => { 
        navigate('/manager/menu');
    }

    const closePopUp = () => {
        setPopUpVisible(false);
    };

    return (
        <>
        <div className='manager-page'>
            <h1>Manager</h1>
            <div className='logout-btn'>Log Out</div>
            <div className='manager-buttons'>
                <button onClick={handleOpenStats}>Stats</button>
                <button onClick={handleOpenManagerMenu}>Menu Customisation</button>
            </div>
        </div>
        {isPopUpVisible && (
                <PopUp message={popupMessage} onClose={closePopUp} isPopUpVisible={isPopUpVisible}/>
            )}
        </>
            
    );
};

export default ManagerPage;