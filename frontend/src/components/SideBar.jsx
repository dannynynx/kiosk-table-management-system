import './SideBar.css';
import requestBill from '../assets/request-bill-icon.svg';
import axios from 'axios';
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import socket from '../socket';
import RequestBillPopUp from './RequestBillPopUp';

const SideBar = ({ onCategorySelect }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isPopUpVisible, setPopUpVisible] = useState(false);
    const navigate = useNavigate();
    
   
    const handleRequestBill = async () => {
        try {
            const data = {
                "table_id": localStorage.getItem('tablenumber'),
                "notification_type": 'bill',
            }
            socket.emit('add_notification', data);
        } catch (error) {
            console.log(error)
        }
        setPopUpVisible(true);
    };

    const closePopUp = () => {
        setPopUpVisible(false);
        navigate('../kiosk/authentication');
    };

    
    const handleLogout = () => {
        navigate('/logout');
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/customer/get_all_categories')
            .then(response => {
                const list = response.data.map(category => ({
                    id: category.category_id,
                    name: category.name,
                }));
                setCategories(list);
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
            </div>
            <div className="sidebar-icon-container" onClick={handleRequestBill}>
                <img src={requestBill} className='bill' alt='Request Bill Icon'/>
            </div>
            <div className='menu-logout-btn' onClick={handleLogout}>Log Out</div>
            {isPopUpVisible && (
                <RequestBillPopUp onClose={closePopUp} isPopUpVisible={isPopUpVisible}/>
            )}
        </>
    );
};

SideBar.propTypes = {
    onCategorySelect: PropTypes.func.isRequired,
};

export default SideBar;