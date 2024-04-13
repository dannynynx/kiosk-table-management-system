import './Cart.css';
import cross from '../assets/cross-icon.svg';
import PropTypes from "prop-types";
import CartItem from './CartItem.jsx';
import { useCart, useInitialiseCart } from '../context/CartContext';
import PopUp from "./PopUp";
import { useEffect, useState } from 'react';
import { useMenu } from "../context/MenuContext.jsx";
import socket from '../socket.jsx';

const Cart = ({ toggleExpand }) => {
    const getCart = useCart();
    const menu = useMenu();
    useEffect(() => {}, [getCart]);

    const setCart = useInitialiseCart()
    const [isPopUpVisible, setPopUpVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState(""); // State to store the message
    const emptyCart = () => getCart.length === 0;
    const calculateTotal = getCart.reduce((total, cartItem) => {
        const menuItem = menu.find(item => item.id === cartItem.id);
        return total + (menuItem.price * cartItem.qty);
    }, 0).toFixed(2);

    const sendOrder = () => {
        if (getCart.length === 0) {
            return;
        }

        const order = {
            "order_items": getCart.map((item) => {
                return {"item_id": parseInt(item.id),
                    "quantity": item.qty}
            }),
            "table_id": localStorage.getItem('tablenumber')
        };

        socket.emit('send_order', order);
        setCart([]);
        setPopupMessage("Your order has been sent");
        setPopUpVisible(true);
    }

    const closePopUp = () => {
        setPopUpVisible(false);
    };

    return (
        <>
            <div className='cart'>
                <div className='cart-header'>
                        <img src={cross} className='cross-icon' alt='Cross Icon' onClick={toggleExpand}/>
                </div>
                <div className='cart-content'>
                    {emptyCart() ? <h6>Cart is empty</h6> : getCart.map(item => <CartItem key={item.id} id={item.id}/>)}
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