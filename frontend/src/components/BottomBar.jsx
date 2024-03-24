import "./BottomBar.css";
import PopUp from "./PopUp";
import { useState } from "react";

const BottomBar = () => {
    const [isPopUpVisible, setPopUpVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState(""); // State to store the message

    const handleAskForAssistance = () => {
        setPopupMessage("Assistance is on the way");
        setPopUpVisible(true);
    };

    const handleRequestBill = () => {
        setPopupMessage("Please make your way to the counter");
        setPopUpVisible(true);
    };

    const closePopUp = () => {
        setPopUpVisible(false);
    };



    return (
        <>
            <div className="bottom-bar">
                <button className="bottom" onClick={handleAskForAssistance}><h3>Ask for assistance</h3></button>
                <button className="bottom" onClick={handleRequestBill}><h3>Request the bill</h3></button>
            </div>
        {isPopUpVisible && (
            <PopUp message={popupMessage} onClose={closePopUp} isPopUpVisible={isPopUpVisible} />
        )}
        </>
    );
};

export default BottomBar;