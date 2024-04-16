import zebra from "../assets/zebra.svg";
import "./ManagerTopBar.css"
import { useState } from "react";
import ReorderItemsPopUp from "./ReorderItemsPopUp.jsx";
import cart from '../assets/cart-icon.svg';
import orderList from '../assets/list-icon.svg';
import assistance from '../assets/call-assistance-icon.svg';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import edit from "../assets/edit.svg"
import editRed from "../assets/edit-red.svg"
import reorderItems from "../assets/Item-reorder.svg";

const ManagerTopBar = ({ onHandleSearchFilter, editMode, onEditModeToggle }) => {
    const token = localStorage.getItem('token');
    const tablenumber = localStorage.getItem('tablenumber');
    const [isPopUpVisible, setPopUpVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState(""); // State to store the message
    const [editbtn, setEditbtn] = useState(edit);

    const closePopUp = () => {
        setPopUpVisible(false);
    };
    
    const handleEditMode = () => {    
        if(editMode) { 
            setEditbtn(edit);
        } else { 
            setEditbtn(editRed);
        }
        onEditModeToggle();
    }

    const handleReorderItems = () => { 
        setPopUpVisible(true);
    }

    return (
        <>
            <div className="topbar">
                <div className="topbar-left">
                    <Link to='/menu' className="topbar-logo-link">
                        <img src={zebra} alt='Zebra Icon' className="topbar-logo"></img>
                    </Link>

                    <input
                        className="search-bar"
                        type='text'
                        placeholder='Search'
                        onChange={(event) => onHandleSearchFilter(event.target.value)}
                    />

                </div>
                <div className="topbar-right">
                    {editMode ? (
                    <div className='topbar-icon-container' onClick={handleReorderItems}>
                        <img src={reorderItems} className='cart' alt='Reorder Items icon'/>
                    </div>
                    ) : '' }
                    <div className='topbar-icon-container' onClick={handleEditMode}>
                        <img src={editbtn} className='cart' alt='Edit icon'/>
                    </div>
                    <div className='topbar-icon-container'>
                        <img src={cart} className='cart' alt='Cart Icon'/>
                    </div>
                    <div className='topbar-icon-container'>
                        <img src={orderList} className='cart' alt='Order List Icon'/>
                    </div>
                    <div className='topbar-icon-container'>
                        <img src={assistance} className={`cart`} alt='Call for Assistance Icon'/>
                    </div>   
                    <h2 className="table-number">#{tablenumber}</h2>
                </div>
            </div>  
            {isPopUpVisible && (
            <ReorderItemsPopUp message={popupMessage} onClose={closePopUp} isPopUpVisible={isPopUpVisible} />
        )}
        </>
    );
};

ManagerTopBar.propTypes = {
    onHandleSearchFilter: PropTypes.func.isRequired,
}

export default ManagerTopBar;