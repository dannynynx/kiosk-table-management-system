import "./AddCategoryPopUp.css";
import backArrow from '../assets/back-arrow-icon.svg';
import PropTypes from "prop-types";
import { useRef } from 'react';

const AddCategoryPopUp = (props) => { 

    const popupClassName = "add-popup" + (props.isPopUpVisible ? " visible" : "");
    const inputRef = useRef();

    const handleAddCategory= (event) => { 
        alert('A name was submitted: ' + inputRef.current.value);
        event.preventDefault();
    }
    
    return (
        <>
        <div className={popupClassName} >
            <div className="add">
                <button onClick={props.onClose} className="close-button">
                    <img src={backArrow} alt='Back Arrow Icon'></img>
                </button>
                <form className="add-category" onSubmit={handleAddCategory}>
                    <h2>Add Category</h2>
                    <label>Category name</label>
                    <input type='text' name="category-name" ref={inputRef} placeholder='category name'/>
                    <button type="submit">Add category</button>
                </form>
            </div>
        </div>
    </>)
}

AddCategoryPopUp.propTypes = {
    isPopUpVisible: PropTypes.bool.isRequired,
    message: PropTypes.object,
    onClose: PropTypes.func.isRequired,
};

export default AddCategoryPopUp;