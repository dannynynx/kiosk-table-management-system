import './Cart.css';
import cross from '../assets/cross-icon.svg';
import PropTypes from "prop-types";
import CartItem from './CartItem.jsx';
import { useCart } from '../context/CartContext';
import PopUp from "./PopUp";
import { useState } from 'react';

const Cart = ({ toggleExpand }) => {
    const getCart = useCart();
    const [isPopUpVisible, setPopUpVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState(""); // State to store the message


    const sendOrder = () => { 
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
                    {getCart.map(item => <CartItem key={item.name} name={item.name} price={item.price} qty={item.qty}/>)}
                </div>
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