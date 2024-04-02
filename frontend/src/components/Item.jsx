import './Item.css';
import { useLocation } from "react-router-dom";
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
    const formattedPrice = price.toFixed(2);
    const ingredientsList = ingredients.join(', ');
    const [quantity, setQuantity] = useState(1);
    const increaseQuantity = () => quantity < 10 && setQuantity(quantity + 1);
    const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);

    const addItemToCart = (quantity) => {

        const isItemInCart = getCart.some(cartItem => cartItem.id === id);
        if (!isItemInCart) {
            addToCartContext(item.id, quantity);
        } else {
            const existingItem = getCart.find(cartItem => cartItem.id === id);
            const newQty = Math.min(existingItem.qty + quantity, 10);
            updateCartItemContext(item.id, newQty);
        }
        setQuantity(1)
    }

    return (
        <div className='item'>
            {image && <img src={`data:image/png;base64,${image}`} className='item-image' alt={name} />}
            <div className='item-details-container'>
                <h1 className='item-name'>{name}</h1>
                <div className='item-price'>${formattedPrice}</div>
                <div className='item-add-line'>
                    <div className='item-quantity-container'>
                        <button onClick={decreaseQuantity}>-</button>
                        <span>{quantity}</span>
                        <button onClick={increaseQuantity}>+</button>
                    </div>
                    <button className='item-add-to-cart' onClick={() => addItemToCart(quantity)}>ADD TO CART</button>
                </div>
                <h2 className='item-detail-heading'>DESCRIPTION</h2>
                <p className='item-description'>{description}</p>
                <h2 className='item-detail-heading'>INGREDIENTS</h2>
                <p className='item-ingredients'>{ingredientsList}</p>
            </div>
        </div>
    )
}

export default Item;
