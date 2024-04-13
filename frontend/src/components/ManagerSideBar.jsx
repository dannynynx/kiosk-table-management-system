import './ManagerSideBar.css';
import requestBill from '../assets/request-bill-icon.svg';
import PopUp from "./PopUp";
import axios from 'axios';
import PropTypes from "prop-types";
import {Link, useNavigate} from "react-router-dom";
import { useState, useEffect } from 'react';
import CategoryOrderPopUp from './CategoryOrderPopUp.jsx';

const ManagerSideBar = ({ onCategorySelect, editMode }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isPopUpVisible, setPopUpVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const navigate = useNavigate();
    const [isOrderPopupVisible, setOrderPopupVisible] = useState(false);
    const [menuItemsOrder, setMenuItemsOrder] = useState([]);
    
   
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

    const handleOrderButtonClick = () => {
        setOrderPopupVisible(true);
    };

    const closePopUp = () => {
        setPopUpVisible(false);
        navigate('../kiosk/authentication');
    };
    
    const closeOrderPopup = () => {
        setOrderPopupVisible(false);
    };

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/customer/get_all_categories')
            .then(response => {
                const list = response.data.map(category => ({
                    id: category.category_id,
                    name: category.name,
                }));
                setCategories(list);
                setMenuItemsOrder(list.map(item => item.id));
            })
            .catch(error => {
                console.error('Error submitting data:', error);
            });
    }, []);

    return (
        <>
            <div className="categories">
                <Link to="/menu">
                    <button onClick={() => {
                        onCategorySelect("");
                        setSelectedCategory(null);
                    }} className={!selectedCategory ? 'selected' : ''}>
                        <h2 className="category">All</h2>
                    </button>
                </Link>
                {editMode == true ? (<button onClick={handleOrderButtonClick}>Reorder Categories</button>) : ''}
                {categories.map((category) => (
                    <Link to="/menu" key={category.id}>
                        <button
                            onClick={() => {
                                onCategorySelect(category.name);
                                setSelectedCategory(category.id);
                            }}
                            className={selectedCategory === category.id ? 'selected' : ''}
                        >
                            <h2 className="category" id={category.id}>{category.name}</h2>
                        </button>
                    </Link>
                ))}
                {editMode == true ? <button>add categories</button> : ''}
            </div>
            <div className="ManagerSideBar-icon-container" onClick={handleRequestBill}>
                <img src={requestBill} className='bill' alt='Request Bill Icon'/>
            </div>
            {isPopUpVisible && (
                <PopUp message={popupMessage} onClose={closePopUp} isPopUpVisible={isPopUpVisible}/>
            )}
            {isOrderPopupVisible && (
                <CategoryOrderPopUp
                    categories={categories}
                    onClose={closeOrderPopup}
                />
            )}
        </>
    );
};

ManagerSideBar.propTypes = {
    onCategorySelect: PropTypes.func.isRequired,
};

export default ManagerSideBar;