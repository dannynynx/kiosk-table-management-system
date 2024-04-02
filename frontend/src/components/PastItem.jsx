import './CartItem.css'
import PropTypes from "prop-types";
import { useMenu} from "../context/MenuContext.jsx";

const PastItem = ({ id, qty }) => {
    // Calculate the total price and format it with two decimal places
    const { price, name, image } = useMenu().find(item => item.id === id);
    const totalPrice = (price * qty).toFixed(2);

    return (
        <>
            <div className='cart-item'>
                <div className='img-qty-container'>
                    {image && <img src={`data:image/png;base64,${image}`} className='cart-item-img' alt={name}/>}
                    <div className='cart-item-qty-bar'>
                        <span className='cart-item-qty'>{qty}</span>
                    </div>
                </div>
                <div className='name-price-container'>
                    <h2 className='cart-item-name'>{name}</h2>
                    <h3 className='cart-item-price'>${totalPrice}</h3>
                </div>
            </div>
            <div className='cart-item-divider'></div>
        </>
    );
}

PastItem.propTypes = {
    id: PropTypes.number.isRequired,
    qty: PropTypes.number.isRequired,
};

export default PastItem;