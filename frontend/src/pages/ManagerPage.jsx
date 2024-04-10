import './ManagerPage.css';
import { useNavigate } from 'react-router-dom';

const ManagerPage = () => {
    const token = { 'token': localStorage.getItem('token')};
    const navigate = useNavigate();


    const handleOpenStats = () => { 
        navigate('/manager/stats');
    }

    const handleOpenManagerMenu = () => { 
        navigate('/manager/menu');
    }

    return (
        <div className='manager-page'>
            <h1>Manager</h1>
            <div className='logout-btn'>Log Out</div>
            <div className='manager-buttons'>
                <button onClick={handleOpenStats}>Stats</button>
                <button onClick={handleOpenManagerMenu}>Menu Customisation</button>
            </div>
        </div>
            
    );
};

export default ManagerPage;