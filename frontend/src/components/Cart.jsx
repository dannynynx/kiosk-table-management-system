import './Cart.css';
import cross from '../assets/cross-icon.svg';
import PropTypes from "prop-types";
import CartItem from './CartItem.jsx';
import { useCart, useRemoveCartItem } from '../context/CartContext';
import PopUp from "./PopUp";
import { useState } from 'react';
import React from "react";

const Cart = ({ toggleExpand }) => {
    const getCart = useCart();
    const removeCartItem = useRemoveCartItem();
    const [isCartEmpty, setCartEmpty] = useState(true);
    const [isPopUpVisible, setPopUpVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState(""); // State to store the message


    const sendOrder = () => { 
        getCart.forEach(item => {
            removeCartItem(item.name);
        })
        setPopupMessage("Your order has been sent");
        setPopUpVisible(true);
    }

    const closePopUp = () => {
        setPopUpVisible(false);
    };

    React.useEffect(() => {
        const cartEmpty = () => {
            if (getCart.length === 0) {
                setCartEmpty(true);
            } else {
                setCartEmpty(false);
            }
            
        }
        cartEmpty();
    });

    const calculateTotal = getCart.reduce((total, item) => total + (item.price * item.qty), 0).toFixed(2);


    return (
        <>
            <div className='cart'>
                <div className='cart-header'>
                        <img src={cross} className='cross-icon' alt='Cross Icon' onClick={toggleExpand}/>
                </div>
                <div className='cart-content'>
                    {isCartEmpty ? (
                        <h7>Cart is empty</h7>
                    ) : (
                        getCart.map(item => <CartItem key={item.name} name={item.name} price={item.price} qty={item.qty}/>)
                    )
                    }
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