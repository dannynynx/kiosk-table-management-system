import "./KioskCodePopUp.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const KioskCodePopUp = (props) => { 

    const popupClassName = "popup" + (props.isPopUpVisible ? " visible" : "");
    const [code, setCode] = useState("");

    // useEffect(() => {
    //     async ()=> {
    //         try {
    //             const data = {"table_id": props.tableId}
    //             const response = await axios.post( 'http://127.0.0.1:5000/customer/table_confirmation', data);
    //             console.log("123")
    //             // console.log(response.data.code);
    //         } catch (error) {
    //             console.error('Error submitting data:', error);
    //             return null;
    //         }
    //     }
    //     async () => {
    //         try {
    //             const response = await axios.get( `http://127.0.0.1:5000/customer/table_code?table_id=${props.tableId}`);
    //             const rawCode = response.data;
    //             setCode(rawCode);
    //         } catch (error) {
    //             console.error('Error submitting data:', error);
    //             return null;
    //         }
    //     }
    // }, []);
    
    return (
        <>
        <div className={popupClassName} >
            <div className="msg">
                <div className="kiosk-popup-message">
                    <h2>Your Table Code Is:</h2>
                    <h2 className="kiosk-code-text">{code}</h2>
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
    tableCode: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default KioskCodePopUp;