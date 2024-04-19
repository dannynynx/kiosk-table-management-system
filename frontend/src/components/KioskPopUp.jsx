import "./KioskPopUp.css";
import PropTypes from "prop-types";
import axios from "axios";
import { useEffect, useState } from "react";

const KioskPopUp = (props) => { 
    const [restaurantColour, getRestaurantColour] = useState("black")

    const popupClassName = "kiosk-popup" + (props.isPopUpVisible ? " visible" : "");

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/manager/get_customisations')
        .then(response => {
            const data = response.data;
            getRestaurantColour(data.primary_colour)
        })
        .catch(error => {
            console.error('Error fetching customisation:', error);
        });
    }, [getRestaurantColour]);

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
                    <input type="button" onClick={handleConfirm} className="kiosk-popup-button" value='Confirm' style={{ backgroundColor: restaurantColour }}></input>
                    <input type="button" onClick={props.onClose} className="kiosk-popup-button" value='Cancel' style={{ backgroundColor: restaurantColour }}></input>
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