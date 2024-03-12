import "./PopUp.css";
import zebra from "../assets/zebra.svg";
import backArrow from '../assets/back-arrow-icon.svg';

const PopUp = (props) => { 

    const popupClassName = "popup" + (props.isPopUpVisible ? " visible" : "");
    
    return (<>
        
        <div className={popupClassName} >
            <div className="msg">
                <button onClick={props.onClose} className="close-button"><img src={backArrow}></img></button>
                <img className="logo" src={zebra}></img>
                <h4>{props.message}</h4>
            </div>
        </div>

    </>)
}

export default PopUp;