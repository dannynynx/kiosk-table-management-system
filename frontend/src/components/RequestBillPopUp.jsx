import "./RequestBillPopUp.css";
import backArrow from '../assets/back-arrow-icon.svg';
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from "axios";

const RequestBillPopUp = (props) => { 

    const popupClassName = "popup" + (props.isPopUpVisible ? " visible" : "");
    const [pastorders, setPastOrders] = useState([]);


    useEffect(() => {
        const table_id = localStorage.getItem('tablenumber');
        axios.get(`http://127.0.0.1:5000/customer/get_past_orders?table_id=${table_id}`)
            .then(response => {
                const data = response.data;
                console.log(data);
                setPastOrders(data);
                console.log(pastorders);
            })
            .catch(error => {
                console.error('Error fetching menu:', error);
            });
    }, []);
    
    return (
        <>
        <div className={popupClassName} >
            <div className="msg">
                <button onClick={props.onClose} className="close-button">
                    <img src={backArrow} alt='Back Arrow Icon'></img>
                </button>
                <h2>Receipt</h2>
                <h4 className="order-sent-message">
                    <table className="bill-table">
                        <tbody>
                        {pastorders.length > 0 ? (pastorders.map((item, index) => (
                                <tr key={index}>
                                    <th>{item.name}</th>
                                    <th>{item.price}</th>
                                    <th>{item.quantity}</th>
                                </tr>
                            ))) : (<tr>
                                    <th>There are no orders to be paid.</th>
                                </tr>)}
                        </tbody>
                    </table>
                    Please make your way to the counter.
                </h4>
            </div>
        </div>
    </>)
}

RequestBillPopUp.propTypes = {
    isPopUpVisible: PropTypes.bool.isRequired,
    message: PropTypes.object,
    onClose: PropTypes.func.isRequired,
};

export default RequestBillPopUp;