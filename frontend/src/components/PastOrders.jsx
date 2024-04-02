import './PastOrders.css';
import cross from "../assets/cross-icon.svg";
import PropTypes from "prop-types";
import { useEffect, useState } from 'react';
import axios from "axios";
import PastItem from "../components/PastItem.jsx";
import { useMenu } from "../context/MenuContext.jsx";

const PastOrders = ({ toggleExpand }) => {
    const menu = useMenu();
    const [pastOrders, setPastOrders] = useState([]);
    const noPastOrders = () => pastOrders.length === 0;
    const total = pastOrders.reduce((total, item) => {
        const menuItem = menu.find(menuItem => menuItem.id === item.id);
        return total + (menuItem.price * item.quantity);
    }, 0).toFixed(2);

    useEffect(() => {
        const table_id = localStorage.getItem('tablenumber');
        axios.get(`http://127.0.0.1:5000/customer/get_past_orders?table_id=${table_id}`)
            .then(response => {
                const data = response.data;
                setPastOrders(data);
            })
            .catch(error => {
                console.error('Error fetching menu:', error);
            });
    }, []);

    return (
        <>
        <div className='past'>
            <div className='past-header'>
                    <img src={cross} className='cross-icon' alt='Cross Icon' onClick={toggleExpand}/></div>
            <div className='past-content'>
                {noPastOrders() ? <h6>No past orders</h6> : pastOrders.map(item => <PastItem key={item.id} id={item.id} qty={item.quantity}/>)}
            </div>
            <div className='past-total'>Current Total: ${total} </div>
        </div>
    </>
    );
}

PastOrders.propTypes = {
    toggleExpand: PropTypes.func.isRequired,
};

export default PastOrders;