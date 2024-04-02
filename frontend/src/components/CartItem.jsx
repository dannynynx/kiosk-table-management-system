import './CartItem.css'
import add from '../assets/plus-icon.svg';
import remove from '../assets/minus-icon.svg';
import trash from '../assets/trash-icon.svg';
import PropTypes from "prop-types";
import {useCart, useRemoveCartItem, useUpdateCartItem} from "../context/CartContext.jsx";

const CartItem = ({ id }) => {
    const { name, price, image, qty } = useCart().find(item => item.id === id);
    const updateCartItem = useUpdateCartItem();
    const removeCartItem = useRemoveCartItem();
    const increaseQuantity = () => {
        if (qty < 10) {
            updateCartItem(name, qty + 1);
        }
    };
    const decreaseQuantity = () => qty > 1 && updateCartItem(name, qty - 1);

    // Calculate the total price and format it with two decimal places
    const totalPrice = (price * qty).toFixed(2);

    return (
        <>
            <div className='cart-item'>
                <div className='img-qty-container'>
                    {image && <img src={`data:image/png;base64,${image}`} className='cart-item-img' alt={name} />}
                    <div className='cart-item-qty-bar'>
                        <img src={add} className='cart-item-qty-btn' alt='plus icon' onClick={increaseQuantity}/>
                        <span className='cart-item-qty'>{qty}</span>
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
    id: PropTypes.number.isRequired,
};

export default CartItem;