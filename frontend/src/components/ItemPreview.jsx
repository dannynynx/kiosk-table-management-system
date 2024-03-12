import './ItemPreview.css'
import placeholderItem from '../assets/item-placeholder.svg';
import PropTypes from "prop-types";

const ItemPreview = ({ name, cost }) => {
    return (
        <div className='item-preview'>
            <img src={placeholderItem} className='item-preview-image' alt='Placeholder Item'/>
            <div className='item-preview-contents'>
                <div className='item-preview-name'>{name}</div>
                <div className='item-preview-price'>${cost}</div>
            </div>
        </div>
    );
};

ItemPreview.propTypes = {
    name: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
};

export default ItemPreview;