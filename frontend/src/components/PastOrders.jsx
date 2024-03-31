import './PastOrders.css';
import cross from "../assets/cross-icon.svg";
import PropTypes from "prop-types";
import { useEffect, useState } from 'react';
import axios from "axios";
import { usePastMenu, useInitialisePastMenu } from '../context/MenuContext';
import PastItem from "../components/PastItem.jsx";

const PastOrders = ({ toggleExpand }) => {
    const InitialisePastOrders = useInitialisePastMenu();
    const getPastOrders = usePastMenu();
    const total = getPastOrders.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    const [orders, setOrders] = useState([]);
    const [isPastOrdersEmpty, setPastOrdersEmpty] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const tablenumber = { 'table_id': localStorage.getItem('tablenumber') };
                const response = await axios.post('http://127.0.0.1:5000/customer/get_past_orders', tablenumber);
                const data = response.data;
                InitialisePastOrders(data);
                updateData(); 
            } catch (error) {
                console.error('Error fetching menu:', error);
            }
        };
        
        const updateData = () => {
            const newData = [];
            getPastOrders.forEach(item => {
                const existingItemIndex = newData.findIndex(i => i.name === item.name);
                if (existingItemIndex !== -1) {
                    newData[existingItemIndex].quantity += item.quantity;
                } else {
                    newData.push(item);
                }
            });
            setOrders(newData);
        };

        const PastOrdersEmpty = () => {
            if (getPastOrders.length === 0) {
                setPastOrdersEmpty(true);
            } else {
                setPastOrdersEmpty(false);
            }
            
        }
        PastOrdersEmpty();
        fetchData();

        
    }, [getPastOrders]);




    return (
        <>
        <div className='past'>
            <div className='past-header'>
                    <img src={cross} className='cross-icon' alt='Cross Icon' onClick={toggleExpand}/>
                    <h3 className="past-name">Past Orders</h3>
            </div>
            <div className='past-content'>
                {isPastOrdersEmpty ? (
                    <h7>Past Orders are shown here</h7>
                ) : (
                    orders.map(item => <PastItem key={item.name} name={item.name} price={item.price} qty={item.quantity}/>)
                )}
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