import "./PopUp.css";
import zebra from "../assets/zebra.svg";

const PopUp = (props) => { 

    let popupStyle = {
        display: "block",
    };

    const handleClose = () => { 
        popupStyle = { 
            display: "none",
        }
    }
    
    return (<>
        
        <div className="popup" style={popupStyle} onClick={handleClose}>
            <div className="msg">
                <img className="logo" src={zebra}></img>
                <h4>{props.message}</h4>
            </div>
            
        </div>

    </>)
}

export default PopUp;