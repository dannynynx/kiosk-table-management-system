import './SideBar.css';
import requestBill from '../assets/request-bill-icon.svg';
import PopUp from "./PopUp";
import axios from 'axios';
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

const SideBar = ({ onCategorySelect }) => {
    const [categories, setCategories] = useState([]);
    const [isPopUpVisible, setPopUpVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const navigate = useNavigate();
    
   
    const handleRequestBill = async () => {
        try {
            const data = {
                "table_id": localStorage.getItem('tablenumber'),
                "token": localStorage.getItem('token'),
                "notification_type": 'bill',
            }
            await axios.post('http://127.0.0.1:5000/customer/notifications/add', data)
        } catch (error) {
            console.log(error)
        }
        setPopupMessage("Please make your way to the counter");
        setPopUpVisible(true);
    };

    const closePopUp = () => {
        setPopUpVisible(false);
        navigate('../kiosk/authentication');
    };
    useEffect(() => {
        const getCategories = async () => {
            try {
                const list = [];
                const response = await axios.get('http://127.0.0.1:5000/customer/get_all_categories');
                for (const category of response.data) { 
                    list.push({
                        id: category.category_id,
                        name: category.name,
                    })
                }
                setCategories(list);
            } catch (error) {
                console.error('Error submitting data:', error);
            }
        }; 
        getCategories();
    }, []);

    return (
        <>
            <div className="categories">
                <button onClick={() => onCategorySelect("")}>
                    <h2 className="category">All</h2>
                </button>
                {categories.map((category) => (
                    <button key={category.id} onClick={() => onCategorySelect(category.name)}>
                        <h2 className="category" id={category.id}>{category.name}</h2>
                    </button>
                ))}
            </div>
            <div className="sidebar-icon-container" onClick={handleRequestBill}>
                <img src={requestBill} className='bill' alt='Request Bill Icon'/>
            </div>
            {isPopUpVisible && (
            <PopUp message={popupMessage} onClose={closePopUp} isPopUpVisible={isPopUpVisible} />
        )}
        </>
    );
};

SideBar.propTypes = {
    onCategorySelect: PropTypes.func.isRequired,
};

export default SideBar;