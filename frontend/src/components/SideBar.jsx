import './SideBar.css';
import cart from '../assets/cart-icon.svg';
import orderList from '../assets/list-icon.svg';
import {useState} from "react";
import Cart from './Cart';
import PastOrders from './PastOrders';
import requestBill from '../assets/request-bill-icon.svg';

import zebra from "../assets/zebra.svg";
import axios from 'axios';
import React from "react";
import { useFilterMenuItems } from "../context/MenuContext";
import PropTypes from "prop-types";

const SideBar = ({onCategorySelect}) => {
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
            <div className="categories">
                {categories.map((category) => (
                    <button key={category.id} onClick={() => onCategorySelect(category.name)}>
                        <h2 className="category" id={category.id}>{category.name}</h2>
                    </button>
                ))}
            </div>
            <div className="sidebar-icon-container" onClick={() => toggleExpand('requestBills')}>
                <img src={requestBill} className='bill' alt='Request Bill Icon'/>
            </div>
        </>
    );
};

SideBar.propTypes = {
    onCategorySelect: PropTypes.func.isRequired,
};

export default SideBar;