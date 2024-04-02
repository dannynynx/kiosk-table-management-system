import "./KioskCodePopUp.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const KioskCodePopUp = (props) => { 

    const popupClassName = "popup" + (props.isPopUpVisible ? " visible" : "");
    
    return (
        <>
        <div className={popupClassName} >
            <div className="msg">
                <div className="kiosk-popup-message">
                    <h2>Your Table Code Is:</h2>
                    <h2 className="kiosk-code-text">0000</h2>
                </div>
                <Link className="kiosk-popup-button-container" to="/kiosk">
                    <input type="button" onClick={props.onClose} className="kiosk-popup-button" value='Exit'></input>
                </Link>
            </div>
        </div>
    </>)
}

KioskCodePopUp.propTypes = {
    isPopUpVisible: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    nextStep: PropTypes.func.isRequired,
};

export default KioskCodePopUp;