import './CategoryOrderPopUp.css';
import PropTypes from "prop-types";
import { useState } from 'react';
import backArrow from '../assets/back-arrow-icon.svg';
import axios from 'axios';

const CategoryOrderPopup = ({ categories, onClose }) => {
    const initialOrderedCategories = categories.map((category, index) => ({
        ...category,
        order: index,
    }));
    const [orderedCategories, setOrderedCategories] = useState(initialOrderedCategories);
    const [draggedCategoryId, setDraggedCategoryId] = useState(null);

    const handleDragStart = (e, categoryId) => {
        setDraggedCategoryId(categoryId);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, targetIndex) => {
        const updatedOrder = [...orderedCategories];
        const draggedIndex = updatedOrder.findIndex(cat => cat.id === draggedCategoryId);
        const [draggedCategory] = updatedOrder.splice(draggedIndex, 1);
        updatedOrder.splice(targetIndex, 0, draggedCategory);
        updatedOrder.forEach((category, index) => {
            category.order = index;
        });
    
        setOrderedCategories(updatedOrder);
    };

    const handleSaveOrder = () => {
        //save to backend
        const data = {"categories": orderedCategories}
        axios.put('http://127.0.0.1:5000/manager/reorder_categories', data)
        .then(response => {
            console.log(data);
            console.log(response);
            onClose();
        })
        .catch(error => { 
            console.error('Error submitting data:', error);
        })
        // onClose();
    };

    return (
        <div className="category-order-popup">
            <div className='msg'>
                <button onClick={onClose} className="close-button">
                    <img src={backArrow} alt='Back Arrow Icon' />
                </button>
                <h2>Order Categories</h2>
                <div className="category-list">
                    {orderedCategories.map((category, index) => (
                        <div
                            key={category.id}
                            className="category-item"
                            draggable
                            onDragStart={(e) => handleDragStart(e, category.id)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, index)}
                        >
                            {category.name}
                        </div>
                    ))}
                </div>
                <button className="save-btn" onClick={handleSaveOrder}>Save Order</button>
            </div>
        </div>
    );
};

CategoryOrderPopup.propTypes = {
    categories: PropTypes.array.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default CategoryOrderPopup;