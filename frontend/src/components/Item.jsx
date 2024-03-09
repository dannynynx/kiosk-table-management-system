import './Item.css';
import placeholderItem from '../assets/item-placeholder.svg';
import backArrow from '../assets/back-arrow-icon.svg';
import addToCart from '../assets/cart-plus-icon.svg';
import add from '../assets/plus-icon.svg';
import remove from '../assets/minus-icon.svg';
import { Link, useParams } from "react-router-dom";

const Item = () => {
    const { id } = useParams();
    return (
        <div className='item'>
            <Link to='/menu'><img src={backArrow} className='back-arrow' alt='Back Arrow Icon'/></Link>
            <img src={addToCart} className='add-to-cart' alt='Cart Plus Icon'/>
            <div className='item-container'>
                <div className='item-image-container'>
                    <h1 className='item-name'>{id}</h1>
                    <img src={placeholderItem} className='item-image' alt='Placeholder Item'/>
                    <div className='item-quantity-bar'>
                        <img src={add} className='quantity-bar-icon' alt='plus icon'/>
                        <span className='quantity-text'>1</span>
                        <img src={remove} className='quantity-bar-icon' alt='minus icon'/>
                    </div>
                </div>
                <div className='description-container'>
                    <h2 className='price'>$9.99</h2>
                    <h3 className='description-heading'>Description</h3>
                    <p className='description-content'></p>
                    <div className='ingredients'>ingredients</div>
                </div>
            </div>
        </div>
    )
}

export default Item;
