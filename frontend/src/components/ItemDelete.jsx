import "./DeleteCategoryPopUp.css";
import backArrow from '../assets/back-arrow-icon.svg';
import PropTypes from "prop-types";
import axios from 'axios';

const ItemDelete = (props) => { 

    const popupClassName = "popup" + (props.isDeleteItemPopUpVisible ? " visible" : "");

    const handleDeleteItem = (id) => { 

        axios.delete('http://127.0.0.1:5000/manager/delete_menu_item',  { data: { id } })
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
            <div className="delete-msg">
                <button onClick={props.onClose} className="close-button">
                    <img src={backArrow} alt='Back Arrow Icon'></img>
                </button>
                <h4 className="order-sent-message">
                    <p>Are you sure you want to delete this item?</p>
                    <p>Item will be deleted permanently.</p>
                    <button className="delete-btn" onClick={() => handleDeleteItem(props.item_id)}>Delete</button>
                </h4>
            </div>
        </div>
    </>)
}

ItemDelete.propTypes = {
    isDeleteItemPopUpVisible: PropTypes.bool.isRequired,
    message: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    item_id: PropTypes.number.isRequired,
};

export default ItemDelete;