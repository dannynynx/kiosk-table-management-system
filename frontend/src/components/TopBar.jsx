import zebra from "../assets/zebra.svg";
import "./TopBar.css"
import axios from 'axios';
import { useState } from "react";
import PopUp from "./PopUp";
import cart from '../assets/cart-icon.svg';
import orderList from '../assets/list-icon.svg';
import assistance from '../assets/call-assistance-icon.svg';
import Cart from './Cart';
import PastOrders from './PastOrders';
import {Link} from "react-router-dom";

const TopBar = () => {
    const tablenumber = localStorage.getItem('tablenumber');
    const [renderContent, setRenderContent] = useState(null);
    const [expanded, setExpanded] = useState(false);  
    const [isPopUpVisible, setPopUpVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState(""); // State to store the message

    const handleAskForAssistance = async () => {
        try {
            const tablenumber = {"table_id": localStorage.getItem('tablenumber')};
            const token = {"token": localStorage.getItem('token')};
            const type = {"notification_type": 'assistance'};
            const data = {
                tablenumber,
                token,
                type
            }
            await axios.post('http://127.0.0.1:5000/customer/notifications/add', data)
        } catch (error) {
            console.log(error)
        }
        setPopupMessage("Assistance is on the way");
        setPopUpVisible(true);

    };

    const closePopUp = () => {
        setPopUpVisible(false);
    };

    
    const toggleExpand = (contentType) => {
        setRenderContent(expanded ? null : contentType);
        setExpanded(!expanded);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
        }
      }

    return (
        <>
            <div className="topbar">
                <div className="left-topbar">
                    <Link to='/menu' className="topbar-logo-link">
                        <img  src={zebra} alt='Zebra Icon' className="topbar-logo"></img>
                    </Link>

                    <input className="search-bar" type='text' placeholder='Search' onKeyDown={handleKeyDown}></input>
                </div>
                <div className="right-topbar">
                    <div className='topbar-icon-container' onClick={() => toggleExpand('cart')}>
                        <img src={cart} className='cart' alt='Cart Icon'/>
                    </div>
                    <div className='topbar-icon-container' onClick={() => toggleExpand('pastOrders')}>
                        <img src={orderList} className='cart' alt='Order List Icon'/>
                    </div>
                    <div className='topbar-icon-container' onClick={handleAskForAssistance}>
                        <img src={assistance} className='cart' alt='Call for Assistance Icon'/>
                    </div>   
                    <div className={`right-topbar ${expanded ? 'expanded' : ''}`}>
                        {renderContent === 'cart' && expanded && <Cart toggleExpand={toggleExpand}/>}
                        {renderContent === 'pastOrders' && expanded && <PastOrders toggleExpand={toggleExpand}/>}
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

export default TopBar;