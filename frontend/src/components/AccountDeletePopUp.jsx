import "./AccountDeletePopUp.css";
import PropTypes from "prop-types";
import { useState } from "react";

const AccountDeletePopUp = (props) => {

    const popupClassName = "account-delete-popup" + (props.isPopUpVisible ? " visible" : "");
    const [message, setmessage] = useState("Are you sure you want to delete this Account?")
    const [textColor, setTextColor] = useState('#000000');

    const handleDeletion = async () => {
        if (props.role === "wait" || props.role === "kitchen") {
            try {
                const data = { "staff_id": props.id }
                console.log(data)
                console.log(typeof data)
                console.log(props.id)
                console.log(typeof props.id)
                const response = await axios.delete( 'http://127.0.0.1:5000/manager/delete_account', data);
                console.log(response)
                props.onClose();
            } catch (error) {
                setTextColor('#d33d3d')
                setmessage("Error: Failed to delete account.")
            }
            props.onClose();
        }
        else {
            setmessage("Error: Account cannot be deleted.");
            setTextColor('#d33d3d');
        }
    }
    
    return (
        <>
        <div className={popupClassName} >
            <div className="account-delete-container">
                <div className="account-delete-message" style={{ color: textColor }}>
                    {message}
                </div>
                <div className="account-delete-button-div">
                    <input type="button" className="account-delete-button" value="Go Back" onClick={props.onClose}/>
                    <input type="button" className="account-delete-button" value="Confirm" onClick={handleDeletion}/>
                </div>
            </div>
        </div>
    </>)
}

AccountDeletePopUp.propTypes = {
    isPopUpVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    role: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
};

export default AccountDeletePopUp;