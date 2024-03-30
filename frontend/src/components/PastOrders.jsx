import './PastOrders.css';
import cross from "../assets/cross-icon.svg";
import PropTypes from "prop-types";
import { useEffect } from 'react';
import axios from "axios";
import { usePastMenu, useInitialisePastMenu } from '../context/MenuContext';
import PastItem from "../components/PastItem.jsx";

const PastOrders = ({ toggleExpand }) => {
    const InitialisePastOrders = useInitialisePastMenu();
    const getPastOrders = usePastMenu();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/customer/get_past_orders');
                const data = response.data;
                console.log(data);
                InitialisePastOrders(data);
            } catch (error) {
                console.error('Error fetching menu:', error);
            }
        };
        fetchData().then(() => console.log(getPastOrders))
    }, []);

    return (
        <>
        <div className='past'>
            <div className='past-header'>
                    <img src={cross} className='cross-icon' alt='Cross Icon' onClick={toggleExpand}/>
                    <h3 className="past-name">Past Orders</h3>
            </div>
            <div className='past-content'>
                 {getPastOrders.map(item => <PastItem key={item.name} name={item.name} price={item.price} qty={item.qty}/>)}
            </div>
            <div className='past-total'>Current Total: </div>
        </div>
    </>
    );
}

PastOrders.propTypes = {
    toggleExpand: PropTypes.func.isRequired,
};

export default PastOrders;