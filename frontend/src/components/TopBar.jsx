import zebra from "../assets/zebra.svg";
import "./TopBar.css"
import axios from 'axios';
import React from "react";
import { useFilterMenuItems } from "../context/MenuContext";
import PropTypes from "prop-types";

import cart from '../assets/cart-icon.svg';
import orderList from '../assets/list-icon.svg';
import {useState} from "react";
import Cart from './Cart';
import PastOrders from './PastOrders';

const TopBar = ({tablenumber}) => {
    const [renderContent, setRenderContent] = useState(null);
    const [expanded, setExpanded] = useState(false);
    const [categories, setCategories] = React.useState([]);
    const filter = useFilterMenuItems(); 
   
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
    });

    const toggleExpand = (contentType) => {
        setRenderContent(expanded ? null : contentType);
        setExpanded(!expanded);
    };


    return (
        <>
            <div className="topbar">
                <div className="left-topbar">
                    <img className="logo" src={zebra} alt='Zebra Icon'></img>
                    <input className="search-bar" type='text' placeholder='Search'></input>
                </div>
                <div className="right-topbar">
                    <div className='topbar-icon-container' onClick={() => toggleExpand('cart')}>
                        <img src={cart} className='cart' alt='Cart Icon'/>
                    </div>
                    <div className='topbar-icon-container' onClick={() => toggleExpand('pastOrders')}>
                        <img src={orderList} className='order-list' alt='Order List Icon'/>
                    </div>
                    <h2 className="table-number">#{tablenumber}</h2>
                </div>
                
                
            </div>
                
        </>
    );
};

TopBar.propTypes = {
    tablenumber: PropTypes.number.isRequired,
};

export default TopBar;