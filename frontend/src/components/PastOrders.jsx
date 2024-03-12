import './PastOrders.css';
import cross from "../assets/cross-icon.svg";
import PropTypes from "prop-types";

const PastOrders = ({ toggleExpand }) => {
    return (
        <div className='past-orders'>
            <img src={cross} className='cross-icon' alt='Cross Icon' onClick={toggleExpand}/>
        </div>
    );
}

PastOrders.propTypes = {
    toggleExpand: PropTypes.func.isRequired,
};

export default PastOrders;