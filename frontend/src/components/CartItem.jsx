import './CartItem.css'
import add from '../assets/plus-icon.svg';
import remove from '../assets/minus-icon.svg';
import trash from '../assets/trash-icon.svg';
import { useState } from "react";
import PropTypes from "prop-types";
import { useRemoveCartItem } from "../context/CartContext.jsx";

const CartItem = ({ name, price, qty }) => {
    const removeCartItem = useRemoveCartItem();
    const [quantity, setQuantity] = useState(qty);
    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);

    // Calculate the total price and format it with two decimal places
    const totalPrice = (price * quantity).toFixed(2);

    return (
        <>
            <div className='cart-item'>
                <div className='img-qty-container'>
                    <img src='https://via.placeholder.com/150' className='cart-item-img' alt='Item'/>
                    <div className='cart-item-qty-bar'>
                        <img src={add} className='cart-item-qty-btn' alt='plus icon' onClick={increaseQuantity}/>
                        <span className='cart-item-qty'>{quantity}</span>
                        <img src={remove} className='cart-item-qty-btn' alt='minus icon' onClick={decreaseQuantity}/>
                    </div>
                </div>
                <div className='name-price-container'>
                    <h2 className='cart-item-name'>{name}</h2>
                    <h3 className='cart-item-price'>${totalPrice}</h3>
                </div>
                <img src={trash} className='cart-item-trash-btn' alt='Trash Icon' onClick={() => removeCartItem(name)}/>
            </div>
            <div className='cart-item-divider'></div>
        </>
    );
}

CartItem.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    qty: PropTypes.number.isRequired,
};

export default CartItem;