import './CategoryOrderPopUp.css';
import PropTypes from "prop-types";
import { useState } from 'react';
import backArrow from '../assets/back-arrow-icon.svg';
import axios from 'axios';
import { useMenu } from '../context/MenuContext';

const ReorderItemsPopUp = ({ onClose }) => {
    const getMenu = useMenu();
    const menu = getMenu.map((item, index) => ({
        ...item,
        order: index,
    }));
    const [orderedItems, setOrderedItems] = useState(menu);
    const [draggedItemId, setDraggedItemId] = useState(null);

    const handleDragStart = (e, itemId) => {
        setDraggedItemId(itemId);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, targetIndex) => {
        const updatedOrder = [...orderedItems];
        const draggedIndex = updatedOrder.findIndex(cat => cat.id === draggedItemId);
        const [draggedItem] = updatedOrder.splice(draggedIndex, 1);
        updatedOrder.splice(targetIndex, 0, draggedItem);
        updatedOrder.forEach((item, index) => {
            item.order = index;
        });
    
        setOrderedItems(updatedOrder);
    };

    const handleSaveOrder = () => {
        const data = {"menu_items": orderedItems}
        axios.put('http://127.0.0.1:5000/manager/reorder_menu_items', data)
        .then(response => {
            console.log(data);
            console.log(response);
            onClose();
        })
        .catch(error => { 
            console.error('Error submitting data:', error);
        })
    };

    return (
        <div className="category-order-popup">
            <div className='category-order-msg'>
                <button onClick={onClose} className="close-button">
                    <img src={backArrow} alt='Back Arrow Icon' />
                </button>
                <h2>Re-order menu items</h2>
                <div className="category-list">
                    {orderedItems.map((item, index) => (
                        <div
                            key={item.id}
                            className="category-item"
                            draggable
                            onDragStart={(e) => handleDragStart(e, item.id)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, index)}
                        >
                            {item.name}
                        </div>
                    ))}
                </div>
                <button className="save-btn" onClick={handleSaveOrder}>Save Order</button>
            </div>
        </div>
    );
};

ReorderItemsPopUp.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default ReorderItemsPopUp;