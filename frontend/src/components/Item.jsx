import './Item.css';
import placeholderItem from '../assets/item-placeholder.svg';
import backArrow from '../assets/back-arrow-icon.svg';
import addToCart from '../assets/cart-plus-icon.svg';
import add from '../assets/plus-icon.svg';
import remove from '../assets/minus-icon.svg';
import { Link, useParams } from "react-router-dom";
import { useState } from "react";

const Item = () => {
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    }

const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
}

    return (
        <div className='item'>
            <Link to='/menu'><img src={backArrow} className='back-arrow' alt='Back Arrow Icon'/></Link>
            <img src={addToCart} className='add-to-cart' alt='Cart Plus Icon'/>
            <div className='item-container'>
                <div className='item-image-container'>
                    <h1 className='item-name'>{id}</h1>
                    <img src={placeholderItem} className='item-image' alt='Placeholder Item'/>
                    <div className='item-quantity-bar'>
                        <img src={add} className='quantity-bar-icon' alt='plus icon' onClick={increaseQuantity}/>
                        <span className='quantity-text'>{quantity}</span>
                        <img src={remove} className='quantity-bar-icon' alt='minus icon' onClick={decreaseQuantity}/>
                    </div>
                </div>
                <div className='description-container'>
                    <h2 className='price'>$9.99</h2>
                    <div className='divider'></div>
                    <h3 className='description-header'>Description</h3>
                    <p className='description-content'>Our tutor would enjoy food that looks like this.</p>
                    <div className='divider'></div>
                    <div className='ingredients-header'>Ingredients</div>
                    <ul className='ingredients'>
                        <li>Plate</li>
                        <li>Spoon</li>
                        <li>Fork</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Item;
