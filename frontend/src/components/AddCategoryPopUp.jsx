import "./AddCategoryPopUp.css";
import backArrow from '../assets/back-arrow-icon.svg';
import PropTypes from "prop-types";
import { useRef } from 'react';
import axios from "axios";
import { useNavigate } from "react-router";

const AddCategoryPopUp = (props) => { 

    const popupClassName = "add-popup" + (props.isPopUpVisible ? " visible" : "");
    const inputRef = useRef();
    const navigate = useNavigate();

    const handleAddCategory= (event) => { 
        event.preventDefault();
        const data = {"category_name": inputRef.current.value}

        console.log(data)

        axios.post('http://127.0.0.1:5000/manager/add_category', data)
        .then(response => {
            console.log(response);
            navigate('/manager/menu')
        })
        .catch(error => {
            console.error('Error submitting data:', error);
        });
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