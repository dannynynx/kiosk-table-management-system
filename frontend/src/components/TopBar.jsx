import zebra from "../assets/zebra.svg";
import "./TopBar.css"
import axios from 'axios';
import React from "react";
import PropTypes from "prop-types";

import cart from '../assets/cart-icon.svg';
import orderList from '../assets/list-icon.svg';
import assistance from '../assets/call-assistance-icon.svg';
import requestBill from '../assets/request-bill-icon.svg';
import {useState} from "react";
import Cart from './Cart';
import PastOrders from './PastOrders';

const TopBar = () => {
    const [renderContent, setRenderContent] = useState(null);
    const [expanded, setExpanded] = useState(false);  
    const tablenumber = localStorage.getItem('tablenumber');
    
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
                    <img className="logo" src={zebra} alt='Zebra Icon'></img>
                    <input className="search-bar" type='text' placeholder='Search' onKeyDown={handleKeyDown}></input>
                </div>
                <div className="right-topbar">
                    <div className='topbar-icon-container' onClick={() => toggleExpand('cart')}>
                        <img src={cart} className='cart' alt='Cart Icon'/>
                    </div>
                    <div className='topbar-icon-container' onClick={() => toggleExpand('pastOrders')}>
                        <img src={orderList} className='cart' alt='Order List Icon'/>
                    </div>
                    <div className='topbar-icon-container' onClick={() => toggleExpand('assistance')}>
                        <img src={assistance} className='cart' alt='Call for Assistance Icon'/>
                    </div>   
                    <div className={`right-topbar ${expanded ? 'expanded' : ''}`}>
                        {renderContent === 'cart' && expanded && <Cart toggleExpand={toggleExpand}/>}
                        {renderContent === 'pastOrders' && expanded && <PastOrders toggleExpand={toggleExpand}/>}
                        {renderContent === 'assistance' && expanded && <PastOrders toggleExpand={toggleExpand}/>}
                    </div> 
                    <h2 className="table-number">#{tablenumber}</h2>
                </div>
            </div>  
        </>
    );
};

export default TopBar;