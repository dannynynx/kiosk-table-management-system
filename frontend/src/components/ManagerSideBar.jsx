import './ManagerSideBar.css';
import requestBill from '../assets/request-bill-icon.svg';
import PopUp from "./PopUp";
import axios from 'axios';
import PropTypes from "prop-types";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useInitialiseMenu, useMenu } from '../context/MenuContext';

const ManagerManagerSideBar = ({ onCategorySelect }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isPopUpVisible, setPopUpVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const navigate = useNavigate();
    const initialiseMenuItem = useInitialiseMenu();
    const getMenu = useMenu();
    const [draggedItemId, setDraggedItemId] = useState(null); // State to track dragged item
    const [menuItemsOrder, setMenuItemsOrder] = useState([])
    const filteredItems = getMenu.filter(item =>
        (!selectedCategory || item.category === selectedCategory));

        useEffect(() => {
            if (!localStorage.getItem('token')) { 
                navigate('/login');
            } 
            axios.get('http://127.0.0.1:5000/customer/get_all_categories')
                .then(response => {
                    const list = response.data.map(category => ({
                        id: category.category_id,
                        name: category.name,
                    }));
                    setCategories(list);
                    setMenuItemsOrder(getMenu.map(item => item.id))
                })
                .catch(error => {
                    console.error('Error submitting data:', error);
                });
             
             
                axios.get('http://127.0.0.1:5000/customer/showMenu')
                .then(response => {
                    const data = response.data;
                    initialiseMenuItem(data);
                })
                .catch(error => {
                    console.error('Error fetching menu:', error);
                });
            
        }, [initialiseMenuItem]);


    const handleDragStart = (e, id) => {
        setDraggedItemId(id); // Set the dragged item's ID
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, targetId) => {
        const updatedOrder = menuItemsOrder.filter(id => id !== draggedItemId); // Remove the dragged item
        const targetIndex = updatedOrder.indexOf(targetId);
        updatedOrder.splice(targetIndex, 0, draggedItemId); // Insert the dragged item at the target position
        setMenuItemsOrder(updatedOrder);
    };
    

    const categoryForm = (
        <>
            <form>
                <div className='category-edit'>
                    <label>Edit Name</label>
                    <input placeholder={selectedCategory}/>
                    <div className="reorder-items">
                    {getMenu.map((id) => {
                    const category = categories.find(item => item.id === id);
                    return (
                        <div key={category.id}
                            draggable // Make the menu item draggable
                            onDragStart={(e) => handleDragStart(e, category.id)} // Set the dragged item's ID
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, category.id)}
                        >
                            <button
                                onClick={() => {
                                    onCategorySelect(category.name);
                                    setSelectedCategory(category.id);
                                }}
                                className={selectedCategory === category.id ? 'selected' : ''}
                            >
                                <h2 className="category" id={category.id}>{category.name}</h2>
                            </button>
                        </div>
                    );
                })}
                    </div>
                </div>
            </form>
        </>
    )


    const closePopUp = () => {
        setPopUpVisible(false);
    };



    return (
        <>
            <div className="categories">
                <button onClick={() => {
                    onCategorySelect("");
                    setSelectedCategory(null);
                }} className={!selectedCategory ? 'selected' : ''}>
                    <h2 className="category">All</h2>
                </button>
                {categories.map((category) => (
                   <div key={category.id}>
                        <button
                            onClick={() => {
                                onCategorySelect(category.name);
                                setSelectedCategory(category.id);
                            }}
                            className={selectedCategory === category.id ? 'selected' : ''}
                        >
                            <h2 className="category" id={category.id}>{category.name}</h2>
                        </button>
                   </div>
                ))}
            </div>
            <div className="ManagerManagerSideBar-icon-container">
                <img src={requestBill} className='bill' alt='Request Bill Icon'/>
            </div>
            {isPopUpVisible && (
                <PopUp message={popupMessage} onClose={closePopUp} isPopUpVisible={isPopUpVisible}/>
            )}
        </>
    );
};

ManagerManagerSideBar.propTypes = {
    onCategorySelect: PropTypes.func.isRequired,
};

export default ManagerManagerSideBar;