import './Cart.css';
import cross from '../assets/cross-icon.svg';
import PropTypes from "prop-types";
import CartItem from './CartItem.jsx';
import { useCart, useRemoveCartItem } from '../context/CartContext';
import PopUp from "./PopUp";
import axios from 'axios';
import { useState } from 'react';

const Cart = ({ toggleExpand }) => {
    const getCart = useCart();
    const removeCartItem = useRemoveCartItem();
    const [isPopUpVisible, setPopUpVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState(""); // State to store the message


    const sendOrder = async () => { 
        try { 
            const order = {
                "order_items": [getCart.map((item) =>  { return item.id})],
                "table_id": localStorage.getItem('tablenumber')
            }
            await axios.post('http://127.0.0.1:5000/customer/send_order', getCart)
            getCart.forEach(item => {
                removeCartItem(item.name);
            })
            setPopupMessage("Your order has been sent");
            setPopUpVisible(true);
        } catch (error) { 
            console.error(error.message);
        }
       
    }

    const closePopUp = () => {
        setPopUpVisible(false);
    };

    const calculateTotal = getCart.reduce((total, item) => total + (item.price * item.qty), 0).toFixed(2);


    return (
        <>
            <div className='cart'>
                <div className='cart-header'>
                        <img src={cross} className='cross-icon' alt='Cross Icon' onClick={toggleExpand}/>
                </div>
                <div className='cart-content'>
                    {getCart.map(item => <CartItem key={item.name} name={item.name} price={item.price} qty={item.qty}/>)}
                </div>
                <div className='cart-total'>Total: {calculateTotal}</div>
                <div className='cart-footer' onClick={sendOrder}>Order Now</div>
            </div>
            {isPopUpVisible && (
            <PopUp message={popupMessage} onClose={closePopUp} isPopUpVisible={isPopUpVisible} />
        )}
        </>
    );
}

Cart.propTypes = {
    toggleExpand: PropTypes.func.isRequired,
};

export default Cart;