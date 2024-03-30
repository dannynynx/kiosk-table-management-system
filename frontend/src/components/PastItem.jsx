import './CartItem.css'
import PropTypes from "prop-types";

const PastItem = ({ name, price, qty }) => {
    // Calculate the total price and format it with two decimal places
    const totalPrice = (price * qty).toFixed(2);

    return (
        <>
            <div className='past-item'>
                <div className='name-price-container'>
                    <span className='past-item-qty'>{qty}</span>
                    <h2 className='cart-item-name'>{name}</h2>
                    <h3 className='cart-item-price'>${totalPrice}</h3>
                </div>
            </div>
            <div className='cart-item-divider'></div>
        </>
    );
}

PastItem.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    qty: PropTypes.number.isRequired,
};

export default PastItem;