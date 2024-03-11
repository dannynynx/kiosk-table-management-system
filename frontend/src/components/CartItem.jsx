import './CartItem.css'
import add from '../assets/plus-icon.svg';
import remove from '../assets/minus-icon.svg';
import trash from '../assets/trash-icon.svg';
import {useState} from "react";

const CartItem = () => {
    const ItemPrice = 9.99;
    const [quantity, setQuantity] = useState(1);
    const increaseQuantity = () => quantity < 5 && setQuantity(quantity + 1);
    const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);

    // Calculate the total price and format it with two decimal places
    const totalPrice = (ItemPrice * quantity).toFixed(2);

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
                    <h2 className='cart-item-name'>Some good food sdfsdf</h2>
                    <h3 className='cart-item-price'>${totalPrice}</h3>
                </div>
                <img src={trash} className='cart-item-trash-btn' alt='Trash Icon'/>
            </div>
            <div className='cart-item-divider'></div>
        </>
    );
}

export default CartItem;