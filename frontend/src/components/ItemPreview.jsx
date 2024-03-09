import './ItemPreview.css'
import placeholderItem from '../assets/item-placeholder.svg';

const ItemPreview = () => {
    return (
        <div className='item-preview'>
            <img src={placeholderItem} className='item-preview-image' alt='Placeholder Item'/>
            <div className='item-preview-contents'>
                <div className='item-preview-name'>Title</div>
                <div className='item-preview-price'>$99.99</div>
            </div>
        </div>
    );
};

export default ItemPreview;