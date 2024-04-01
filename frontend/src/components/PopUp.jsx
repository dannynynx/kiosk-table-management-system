import "./PopUp.css";
import zebra from "../assets/zebra.svg";
import backArrow from '../assets/back-arrow-icon.svg';
import PropTypes from "prop-types";

const PopUp = (props) => { 

    const popupClassName = "popup" + (props.isPopUpVisible ? " visible" : "");
    
    return (
        <>
        <div className={popupClassName} >
            <div className="msg">
                <button onClick={props.onClose} className="close-button">
                    <img src={backArrow} alt='Back Arrow Icon'></img>
                </button>
                <h4 className="order-sent-message">{props.message}</h4>
            </div>
        </div>
    </>)
}

PopUp.propTypes = {
    isPopUpVisible: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default PopUp;