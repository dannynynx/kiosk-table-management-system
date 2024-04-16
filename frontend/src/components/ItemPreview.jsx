import './ItemPreview.css'
import PropTypes from "prop-types";
import {useMenu} from "../context/MenuContext.jsx";

const ItemPreview = ({ id }) => {
    const { name, price, image } = useMenu().find(item => item.id === id);
    const formattedPrice = price.toFixed(2);
    return (
        <div className='item-preview'>
            {image && <img src={image} className='item-preview-image' alt={name} />}
            <div className='item-preview-contents'>
                <div className='item-preview-name'>{name}</div>
                <div className='item-preview-price'>${formattedPrice}</div>
            </div>
        </div>
    );
};

ItemPreview.propTypes = {
    id: PropTypes.number.isRequired,
};

export default ItemPreview;