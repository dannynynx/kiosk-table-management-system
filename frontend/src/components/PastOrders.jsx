import './PastOrders.css';
import cross from "../assets/cross-icon.svg";
import PropTypes from "prop-types";

const PastOrders = ({ toggleExpand }) => {
    return (
        <>
        <div className='cart'>
            <div className='cart-header'>
                    <img src={cross} className='cross-icon' alt='Cross Icon' onClick={toggleExpand}/>
            </div>
            <div className='cart-content'>
                
            </div>
            <div className='cart-total'>Current Total: </div>
            <div className='cart-total'>Total: </div>
        </div>
    </>
    );
}

PastOrders.propTypes = {
    toggleExpand: PropTypes.func.isRequired,
};

export default PastOrders;