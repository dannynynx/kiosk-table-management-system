import './SideBar.css';
import cart from '../assets/cart-icon.svg';
import orderList from '../assets/list-icon.svg';
import {useState} from "react";
import Cart from './Cart';
import PastOrders from './PastOrders';

import zebra from "../assets/zebra.svg";
import axios from 'axios';
import React from "react";
import { useFilterMenuItems } from "../context/MenuContext";
import PropTypes from "prop-types";

const SideBar = () => {
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
            {/* <div className='sidebar-icon-container' onClick={() => toggleExpand('cart')}>
                <img src={cart} className='cart' alt='Cart Icon'/>
            </div>
            <div className='sidebar-icon-container' onClick={() => toggleExpand('pastOrders')}>
                <img src={orderList} className='order-list' alt='Order List Icon'/>
            </div>
            <div className={`sidebar ${expanded ? 'expanded' : ''}`}>
                {renderContent === 'cart' && expanded && <Cart toggleExpand={toggleExpand}/>}
                {renderContent === 'pastOrders' && expanded && <PastOrders toggleExpand={toggleExpand}/>}
            </div> */}
            <div className="categories">
                    <button><h2 className="all">All</h2></button>
                    {categories.map((category) => (
                        <button key={category.id} onClick={() => filter(category.name)}>
                            <h2 className="category" id={category.id}>{category.name}</h2>
                        </button>
                    ))}
                </div>
        </>
    );
};

export default SideBar;