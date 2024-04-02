import zebra from "../assets/zebra.svg";
import "./TopBar.css"
import axios from 'axios';
import { useEffect, useState } from "react";
import PopUp from "./PopUp";
import cart from '../assets/cart-icon.svg';
import orderList from '../assets/list-icon.svg';
import assistance from '../assets/call-assistance-icon.svg';
import Cart from './Cart';
import PastOrders from './PastOrders';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const TopBar = ({ onHandleSearchFilter }) => {
    const token = localStorage.getItem('token');
    const tablenumber = localStorage.getItem('tablenumber');
    const [renderContent, setRenderContent] = useState(null);
    const [expanded, setExpanded] = useState(false);  
    const [isPopUpVisible, setPopUpVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState(""); // State to store the message
    const [notif, setNotif] = useState(null);



   
    const getNotif = () => {
        axios.get('http://127.0.0.1:5000/waitstaff/get_notification_status', token)
        .then(response => {
            const data = response.data ?? [];
            console.log(data);
            data.forEach(notif => {
                if(notif.notification_type == "assistance" && notif.table_id == tablenumber && notif.status == "new") { 
                    setNotif(notif);
                    return;
                }
            });
        }).catch(error => { 
            console.error('Error fetching notifications:', error);
        });
    }
    
    const handleAskForAssistance = async () => {
        if(!notif) { 
            try {
                const data = {
                    "table_id": localStorage.getItem('tablenumber'),
                    "token": localStorage.getItem('token'),
                    "notification_type": 'assistance',
                }
                await axios.post('http://127.0.0.1:5000/customer/notifications/add', data)
            } catch (error) {
                console.log(error)
            }
            setPopupMessage("Assistance is on the way");
            setPopUpVisible(true);
            getNotif();
        } else { 
            const data = { 
                new_status: "closed",
                notification_id: notif.notification_id,
                token: localStorage.getItem('token')
            }
            console.log(data)
            axios.put('http://127.0.0.1:5000/waitstaff/update_notification_status', data)
            .then(response => { 
                console.log(response);
                setNotif(null);
                setPopupMessage("Assistance has been given");
                setPopUpVisible(true);
            }).catch(error => { 
                console.error('Error fetching notifications:', error);
            }); 
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
                    <div className='topbar-icon-container' onClick={() => toggleExpand('cart')}>
                        <img src={cart} className='cart' alt='Cart Icon'/>
                    </div>
                    <div className='topbar-icon-container' onClick={() => toggleExpand('pastOrders')}>
                        <img src={orderList} className='cart' alt='Order List Icon'/>
                    </div>
                    <div className='topbar-icon-container' onClick={handleAskForAssistance}>
                        <img src={assistance} className={`cart ${notif ? 'assist_waiting' : ''}`} alt='Call for Assistance Icon'/>
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