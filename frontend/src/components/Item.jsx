import './Item.css'
import placeholderItem from '../assets/item-placeholder.svg';

const Item = () => {
    return (
        <>
            <img src={placeholderItem} className='item-image' alt="Placeholder Item"/>
        </>
    );
};

export default Item;