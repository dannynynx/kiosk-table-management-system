import './KioskPage.css';
import zebra from "../assets/zebra-blue.svg";
import { Link } from "react-router-dom";
import TableSelection from "../pages/TableSelectionPage.jsx";

const KioskPage = () => {
    return (
        <>
            <section className='kiosk-container'>
                <div className='kiosk-company-info'>
                    <img className="kiosk-logo" src={zebra} alt='Zebra Icon'></img>
                    <h1 className='kiosk-title'>Blue<br></br>Zebra</h1>
                </div>
                <Link className='kiosk-button-container' to="/kiosk/table-selection">
                    <input type='button' className='kiosk-button' value='Select Table'></input>
                </Link>
            </section>
        </>
    );
};

export default KioskPage;