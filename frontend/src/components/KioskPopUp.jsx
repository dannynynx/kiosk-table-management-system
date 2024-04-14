import "./KioskPopUp.css";
import PropTypes from "prop-types";

const KioskPopUp = (props) => { 

    const popupClassName = "kiosk-popup" + (props.isPopUpVisible ? " visible" : "");

    const handleConfirm = () => {
        const numberAfterHash = parseInt(props.message.split("#")[1]);
        props.nextStep(numberAfterHash);
    };
    
    return (
        <>
        <div className={popupClassName} >
            <div className="kiosk-popup-msg">
                <h2 className="kiosk-popup-message">{props.message}</h2>
                <div className="kiosk-popup-button-container">
                    <input type="button" onClick={handleConfirm} className="kiosk-popup-button" value='Confirm'></input>
                    <input type="button" onClick={props.onClose} className="kiosk-popup-button" value='Cancel'></input>
                </div>
            </div>
        </div>
    </>)
}

KioskPopUp.propTypes = {
    isPopUpVisible: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    nextStep: PropTypes.func.isRequired,
};

export default KioskPopUp;