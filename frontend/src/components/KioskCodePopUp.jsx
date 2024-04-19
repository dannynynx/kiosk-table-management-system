import "./KioskCodePopUp.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const KioskCodePopUp = (props) => { 
    const [restaurantColour, getRestaurantColour] = useState("black")

    const popupClassName = "kiosk-code-popup" + (props.isPopUpVisible ? " visible" : "");

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
    
    return (
        <>
        <div className={popupClassName} >
            <div className="kiosk-code-msg">
                <div className="kiosk-code-popup-message">
                    <h2>Your Table Code Is:</h2>
                    <h2 className="kiosk-code-text">{props.tableCode}</h2>
                </div>
                <Link className="kiosk-code-popup-button-container" to="/kiosk">
                    <input type="button" onClick={props.onClose} className="kiosk-code-popup-button" value='Exit' style={{ backgroundColor: restaurantColour }}></input>
                </Link>
            </div>
        </div>
    </>)
}

KioskCodePopUp.propTypes = {
    isPopUpVisible: PropTypes.bool.isRequired,
    tableCode: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default KioskCodePopUp;