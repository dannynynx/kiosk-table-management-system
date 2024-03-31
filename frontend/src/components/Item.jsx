import './Item.css';
import placeholderItem from '../assets/item-placeholder.svg';
import backArrow from '../assets/back-arrow-icon.svg';
import addToCart from '../assets/cart-plus-icon.svg';
import add from '../assets/plus-icon.svg';
import remove from '../assets/minus-icon.svg';
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useMenu } from "../context/MenuContext.jsx";
import { useCart, useAddCartItem, useUpdateCartItem } from "../context/CartContext.jsx";

const Item = () => {
    const getMenu = useMenu();
    const getCart = useCart();
    const addToCartContext = useAddCartItem();
    const updateCartItemContext = useUpdateCartItem();
    const { id: name } = useParams();
    const linkProcessedMenu = getMenu.map(item => item.name.toLowerCase().replace(/\s/g, '-'));
    const index = linkProcessedMenu.findIndex(item => item === name.toLowerCase().replace(/\s/g, '-'));
    const item = getMenu[index];
    const { price, description, ingredients } = getMenu[index];
    const [quantity, setQuantity] = useState(1);
    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);

    const addItemToCart = (quantity) => {
        const isItemInCart = getCart.some(cartItem => cartItem.name === name);
        if (!isItemInCart) {
            const itemWithQty = { index, ...item, qty: quantity };
            addToCartContext(itemWithQty);
        } else {
            const existingItem = getCart.find(cartItem => cartItem.name === name);
            const newQty = existingItem.qty + quantity;
            updateCartItemContext(name, newQty);
        }
        setQuantity(1)
    }

    return (
        <div className='item'>
            <Link to='/menu'><img src={backArrow} className='back-arrow' alt='Back Arrow Icon'/></Link>
            <div className='item-container'>
                <div className='item-image-container'>
                    <h1 className='item-name'>{name}</h1>
                    <img src={placeholderItem} className='item-image' alt='Placeholder Item'/>
                    <div className='item-cart-quantity-row'>
                        <div className='item-quantity-bar'>
                            <img src={add} className='quantity-bar-icon' alt='plus icon' onClick={increaseQuantity}/>
                            <span className='quantity-text'>{quantity}</span>
                            <img src={remove} className='quantity-bar-icon' alt='minus icon' onClick={decreaseQuantity}/>
                        </div>
                        <img src={addToCart} className='add-to-cart' alt='Cart Plus Icon' onClick={() => addItemToCart(quantity)}/>
                    </div>
                    
                </div>
                <div className='description-container'>
                    <h2 className='price'>${price}</h2>
                    <div className='divider'></div>
                    <h3 className='description-header'>Description</h3>
                    <p className='description-content'>{description}</p>
                    <div className='divider'></div>
                    <div className='ingredients-header'>Ingredients</div>
                    <ul className='ingredients'>
                        {ingredients.map(ingredient => <li key={ingredient}>{ingredient}</li>)}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Item;
