import "./RequestBillPopUp.css";
import backArrow from '../assets/back-arrow-icon.svg';
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from "axios";
import socket from '../socket'

const WaitBillPopUp = (props) => { 

    const popupClassName = "popup" + (props.isPopUpVisible ? " visible" : "");
    const [pastorders, setPastOrders] = useState([]);
    const [paid, setPaid] = useState(false);


    useEffect(() => {
        const table_id = props.table;
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

    const handlePaid = () => { 
        setPaid(true);
    }

    const handleUpdateBill = () => { 
        const table_id = props.table;
        axios.delete('http://127.0.0.1:5000/customer/clear_order', { data: { table_id } } )
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.error('Error submitting data:', error);
        });     
        props.onClose();
    }
    
    return (
        <>
        <div className={popupClassName} >
            <div className="msg">
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
                   <div className="btn-group">
                        {paid ? (<button onClick={handleUpdateBill}>Paid</button>)
                        : (<div className="btn-group"><button onClick={handlePaid}>Card</button> | <button onClick={handlePaid}>Cash</button></div>)}
                   </div>
                </h4>
            </div>
        </div>
    </>)
}

WaitBillPopUp.propTypes = {
    isPopUpVisible: PropTypes.bool.isRequired,
    table: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default WaitBillPopUp;