import './Item.css'
import placeholderItem from '../assets/item-placeholder.svg';

const Item = () => {
    return (
        <div className='item'>
            <img src={placeholderItem} className='item-image' alt="Placeholder Item"/>
            <div className='item-contents'>
                <div className='item-name'>Title</div>
                <div className='item-price'>$99.99</div>
            </div>
        </div>
    );
};

export default Item;