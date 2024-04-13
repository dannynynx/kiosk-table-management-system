import './CategoryOrderPopUp.css';
import PropTypes from "prop-types";
import { useState } from 'react';

const CategoryOrderPopup = ({ categories, menuItemsOrder, onClose }) => {
    const [orderedCategories, setOrderedCategories] = useState(menuItemsOrder);

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, targetId) => {
        const updatedOrder = [...orderedCategories];
        const draggedItemId = e.dataTransfer.getData("text/plain");
        const draggedItemIndex = updatedOrder.indexOf(Number(draggedItemId));
        const targetIndex = updatedOrder.indexOf(Number(targetId));
        updatedOrder.splice(draggedItemIndex, 1); // Remove the dragged item
        updatedOrder.splice(targetIndex, 0, Number(draggedItemId)); // Insert the dragged item at the target position
        setOrderedCategories(updatedOrder);
    };

    const handleSaveOrder = () => {
        //go to the backend
        onClose(); // Close the pop-up screen
    };

    return (
        <div className="category-order-popup">
            <div className="msg">
                <h2>Order Categories</h2>
                <div className="category-list">
                    {orderedCategories.map((id) => {
                        const category = categories.find(item => item.id === id);
                        return (
                            <div
                                key={category.id}
                                className="category-item"
                                draggable
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, category.id)}
                            >
                                {category.name}
                            </div>
                        );
                    })}
                </div>
                <button className="save-btn" onClick={handleSaveOrder}>Save Order</button>
            </div>
        </div>
    );
};

CategoryOrderPopup.propTypes = {
    categories: PropTypes.array.isRequired,
    menuItemsOrder: PropTypes.array.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default CategoryOrderPopup;


