import './Cart.css';
import cross from '../assets/cross-icon.svg';
import PropTypes from "prop-types";
import CartItem from './CartItem.jsx';
import { useCart } from '../context/CartContext';

const Cart = ({ toggleExpand }) => {
    const getCart = useCart();

    return (
        <div className='cart'>
            <div className='cart-header'>
                    <img src={cross} className='cross-icon' alt='Cross Icon' onClick={toggleExpand}/>
            </div>
            <div className='cart-content'>
                {getCart.map(item => <CartItem key={item.name} name={item.name} price={item.price} qty={item.qty}/>)}
            </div>
            <div className='cart-footer'>Order Now</div>
        </div>
    );
}

Cart.propTypes = {
    toggleExpand: PropTypes.func.isRequired,
};

export default Cart;