import zebra from "../assets/zebra.svg";
import "./TopBar.css"
import { useEffect, useState } from "react";
import PopUp from "./PopUp";
import cart from '../assets/cart-icon.svg';
import orderList from '../assets/list-icon.svg';
import assistance from '../assets/call-assistance-icon.svg';
import Cart from './Cart';
import PastOrders from './PastOrders';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import socket from "../socket";
import axios from "axios";

const TopBar = ({ onHandleSearchFilter }) => {
    const tablenumber = localStorage.getItem('tablenumber');
    const [renderContent, setRenderContent] = useState(null);
    const [expanded, setExpanded] = useState(false);  
    const [isPopUpVisible, setPopUpVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState(""); // State to store the message
    const [assistId, setAssistId] = useState(null);
    const [restaurantColour, getRestaurantColour] = useState("black")
    socket.on('updated_notification_status', (data) => {
        setAssistId(null);
        data.forEach(notif => {
            if (notif.notification_type === "assistance" && notif.table_id === parseInt(tablenumber) && notif.status === "new") {
                setAssistId(notif.notification_id);
            }
        });
    })

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/manager/get_customisations')
        .then(response => {
            const data = response.data;
            getRestaurantColour(data.primary_colour)
        })
        .catch(error => {
            console.error('Error fetching customisation:', error);
        });
    }, [getRestaurantColour]);

    const handleAskForAssistance = async () => {
        if (assistId === null) {
            try {
                const data = {
                    "table_id": localStorage.getItem('tablenumber'),
                    "notification_type": 'assistance',
                }

                socket.emit('add_notification', data);
            } catch (error) {
                console.log(error)
            }
            setPopupMessage("Assistance is on the way");
            setPopUpVisible(true);
        } else { 
            const data = { 
                new_status: "closed",
                notification_id: assistId,
            }
            setAssistId(null);
            socket.emit('update_notification_status', data);
        }
    };

    const closePopUp = () => {
        setPopUpVisible(false);
    };
    
    const toggleExpand = (contentType) => {
        setRenderContent(expanded ? null : contentType);
        setExpanded(!expanded);
    };

    return (
        <>
            <div className="topbar" style={{ backgroundColor: restaurantColour }}>
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
                    <div className='topbar-icon-container' onClick={() => toggleExpand('cart')}>
                        <img src={cart} className='cart' alt='Cart Icon'/>
                    </div>
                    <div className='topbar-icon-container' onClick={() => toggleExpand('pastOrders')}>
                        <img src={orderList} className='cart' alt='Order List Icon'/>
                    </div>
                    <div className='topbar-icon-container' onClick={handleAskForAssistance}>
                        <img src={assistance} className={`cart ${assistId ? 'assist_waiting' : ''}`} alt='Call for Assistance Icon'/>
                    </div>   
                    <div className={`topbar-right ${expanded ? 'expanded' : ''}`}>
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

TopBar.propTypes = {
    onHandleSearchFilter: PropTypes.func.isRequired,
}

export default TopBar;