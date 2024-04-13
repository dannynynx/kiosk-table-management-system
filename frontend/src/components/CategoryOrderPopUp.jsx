import './CategoryOrderPopUp.css';
import PropTypes from "prop-types";
import { useState } from 'react';
import backArrow from '../assets/back-arrow-icon.svg'

const CategoryOrderPopup = ({ categories, onClose }) => {
    const [orderedCategories, setOrderedCategories] = useState(categories);

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, targetIndex) => {
        const draggedCategoryId = e.dataTransfer.getData("text/plain");
        const updatedOrder = [...orderedCategories];
        const draggedIndex = updatedOrder.findIndex(cat => cat.id === draggedCategoryId);
        const [draggedCategory] = updatedOrder.splice(draggedIndex, 1);
        updatedOrder.splice(targetIndex, 0, draggedCategory);
        setOrderedCategories(updatedOrder);
    };

    const handleSaveOrder = () => {
        //save to backend
        onClose();
    };

    return (
        <div className="category-order-popup">
            <div className='msg'>
                <button onClick={onClose} className="close-button">
                    <img src={backArrow} alt='Back Arrow Icon'></img>
                </button>
                <h2>Order Categories</h2>
                <div className="category-list">
                    {orderedCategories.map((category, index) => (
                        <div
                            key={category.id}
                            className="category-item"
                            draggable
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