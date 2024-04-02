import './SideBar.css';
import {useState} from "react";
import requestBill from '../assets/request-bill-icon.svg';
import PopUp from "./PopUp";
import axios from 'axios';
import React from "react";
import PropTypes from "prop-types";

const SideBar = ({onCategorySelect}) => {
    const [categories, setCategories] = React.useState([]);
    const [isPopUpVisible, setPopUpVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
   
    const handleRequestBill = () => {
        setPopupMessage("Please make your way to the counter");
        setPopUpVisible(true);
    };

    const closePopUp = () => {
        setPopUpVisible(false);
    };
    React.useEffect(() => {
        const getCategories = async () => {
            try {
                const list = [];
                const response = await axios.get('http://127.0.0.1:5000/customer/get_all_categories');
                for (const category of response.data) { 
                    list.push({
                        id: category.category_id,
                        name: category.name,
                    })
                }
                setCategories(list);
            } catch (error) {
                console.error('Error submitting data:', error);
            }
        }; 
        getCategories();
    }, []);

    return (
        <>
            <div className="categories">
                <button onClick={() => onCategorySelect("")}>
                    <h2 className="category">All</h2>
                </button>
                {categories.map((category) => (
                    <button key={category.id} onClick={() => onCategorySelect(category.name)}>
                        <h2 className="category" id={category.id}>{category.name}</h2>
                    </button>
                ))}
            </div>
            <div className="sidebar-icon-container" onClick={handleRequestBill}>
                <img src={requestBill} className='bill' alt='Request Bill Icon'/>
            </div>
            {isPopUpVisible && (
            <PopUp message={popupMessage} onClose={closePopUp} isPopUpVisible={isPopUpVisible} />
        )}
        </>
    );
};

SideBar.propTypes = {
    onCategorySelect: PropTypes.func.isRequired,
};

export default SideBar;