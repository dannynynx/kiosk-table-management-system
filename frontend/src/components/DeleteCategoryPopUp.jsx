import "./DeleteCategoryPopUp.css";
import backArrow from '../assets/back-arrow-icon.svg';
import PropTypes from "prop-types";
import axios from 'axios';

const DeleteCategoryPopUp = (props) => { 

    const popupClassName = "popup" + (props.isDeleteCategoryPopUpVisible ? " visible" : "");


    const handleDeleteCategory = (category_id) => { 

        axios.delete('http://127.0.0.1:5000/manager/delete_category',  { data: { category_id } })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.error('Error submitting data:', error);
        });
    }
    
    return (
        <>
        <div className={popupClassName} >
            <div className="delete-category-msg">
                <button onClick={props.onClose} className="close-button">
                    <img src={backArrow} alt='Back Arrow Icon'></img>
                </button>
                <h4 className="order-sent-message">
                    <p>Are you sure you want to delete this category?</p>
                    <p>All items in this category will be uncategorised.</p>
                    <button className="delete-btn" onClick={() => handleDeleteCategory(props.category_id)}>Delete</button>
                </h4>
            </div>
        </div>
    </>)
}

DeleteCategoryPopUp.propTypes = {
    isDeleteCategoryPopUpVisible: PropTypes.number.isRequired,
    message: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    category_id: PropTypes.number.isRequired,
};

export default DeleteCategoryPopUp;