import zebra from "../assets/zebra.svg";
import "./ManagerTopBar.css"
import axios from 'axios';
import { useState } from "react";
import PopUp from "./PopUp";
import cart from '../assets/cart-icon.svg';
import orderList from '../assets/list-icon.svg';
import assistance from '../assets/call-assistance-icon.svg';
import Cart from './Cart';
import PastOrders from './PastOrders';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import edit from "../assets/edit.svg"
import editRed from "../assets/edit-red.svg"

const ManagerTopBar = ({ onHandleSearchFilter }) => {
    const token = localStorage.getItem('token');
    const tablenumber = localStorage.getItem('tablenumber');
    const [isPopUpVisible, setPopUpVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState(""); // State to store the message
    const [editMode, setEditMode] = useState(edit);

    const closePopUp = () => {
        setPopUpVisible(false);
    };
    
    const handleEditMode = () => { 
        setEditMode(editRed);
        localStorage.setItem('edit', true);
    }

    return (
        <>
            <div className="ManagerTopBar">
                <div className="ManagerTopBar-left">
                    <Link to='/menu' className="ManagerTopBar-logo-link">
                        <img src={zebra} alt='Zebra Icon' className="ManagerTopBar-logo"></img>
                    </Link>

                    <input
                        className="search-bar"
                        type='text'
                        placeholder='Search'
                        onChange={(event) => onHandleSearchFilter(event.target.value)}
                    />

                </div>
                <div className="ManagerTopBar-right">
                    <div className='topbar-icon-container' onClick={handleEditMode}>
                            <img src={editMode} className='edit' alt='Edit icon'/>
                    </div>
                    <div className='ManagerTopBar-icon-container'>
                        <img src={cart} className='cart' alt='Cart Icon'/>
                    </div>
                    <div className='ManagerTopBar-icon-container'>
                        <img src={orderList} className='cart' alt='Order List Icon'/>
                    </div>
                    <div className='ManagerTopBar-icon-container'>
                        <img src={assistance} className={`cart`} alt='Call for Assistance Icon'/>
                    </div>   
                    <h2 className="table-number">#{tablenumber}</h2>
                </div>
            </div>  
            {isPopUpVisible && (
            <PopUp message={popupMessage} onClose={closePopUp} isPopUpVisible={isPopUpVisible} />
        )}
        </>
    );
};

ManagerTopBar.propTypes = {
    onHandleSearchFilter: PropTypes.func.isRequired,
}

export default ManagerTopBar;