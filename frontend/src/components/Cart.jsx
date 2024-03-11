import './Cart.css';
import cross from '../assets/cross-icon.svg';
import PropTypes from "prop-types";

const Cart = ({ toggleExpand }) => {
    return (
        <div className='cart'>
            <div className='cart-header'>
                    <img src={cross} className='cross-icon' alt='Cross Icon' onClick={toggleExpand}/>
            </div>
            <div className='cart-content'>
                hello world
            </div>
            <div className='cart-footer'>Order Now</div>
        </div>
    );
}

Cart.propTypes = {
    toggleExpand: PropTypes.func.isRequired,
};

export default Cart;