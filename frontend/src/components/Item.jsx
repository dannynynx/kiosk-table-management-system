import './Item.css';
import backArrow from '../assets/back-arrow-icon.svg';
import addToCart from '../assets/cart-plus-icon.svg';
import add from '../assets/plus-icon.svg';
import remove from '../assets/minus-icon.svg';
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useMenu } from "../context/MenuContext.jsx";
import { useCart, useAddCartItem, useUpdateCartItem } from "../context/CartContext.jsx";

const Item = () => {
    const queryParams = new URLSearchParams(useLocation().search);
    const id = parseInt(queryParams.get('param'),10);
    const getMenu = useMenu();
    const getCart = useCart();
    const addToCartContext = useAddCartItem();
    const updateCartItemContext = useUpdateCartItem();

    const item = getMenu.find(item => item.id === id);
    const { name, description, price, ingredients, image } = item;
    const ingredientsList = ingredients.join(', ');
    const [quantity, setQuantity] = useState(1);
    const increaseQuantity = () => quantity < 9 && setQuantity(quantity + 1);
    const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);

    const addItemToCart = (quantity) => {

        const isItemInCart = getCart.some(cartItem => cartItem.id === id);
        if (!isItemInCart) {
            const itemWithQty = { ...item, qty: quantity };
            addToCartContext(itemWithQty);
        } else {
            const existingItem = getCart.find(cartItem => cartItem.name === name);
            const newQty = Math.min(existingItem.qty + quantity, 10);
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
                    {image && <img src={`data:image/png;base64,${image}`} className='item-image-container' alt={name} />}
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
                    <div className='ingredients-content'>{ingredientsList}</div>
                </div>
            </div>
        </div>
    )
}

export default Item;
