import './PastOrders.css';
import cross from "../assets/cross-icon.svg";
import PropTypes from "prop-types";

const PastOrders = ({ toggleExpand }) => {
    return (
        <>
        <div className='past'>
            <div className='past-header'>
                    <img src={cross} className='cross-icon' alt='Cross Icon' onClick={toggleExpand}/>
                    <h3 className="past-name">Past Orders</h3>
            </div>
            <div className='cart-content'>
                
            </div>
            <div className='cart-total'>Current Total: </div>
        </div>
    </>
    );
}

PastOrders.propTypes = {
    toggleExpand: PropTypes.func.isRequired,
};

export default PastOrders;