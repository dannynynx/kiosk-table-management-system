import './WaiterPage.css';
import {useEffect, useState} from "react";
import axios from "axios";

const WaiterPage = () => {
    const [notifs, setNotifs] = useState([])
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/kitchen/get_order_status')
            } catch {

            }
        };
    }, []);
   

    return (
        <div className='waiter-page'>
            <div className='logout-btn'>Log Out</div>
            <div className='waiter-table-container'>
                <table className='waiter-table'>
                    <caption>Food Ready to Serve</caption>
                    <thead>
                    <tr>
                        <th>Table Number</th>
                        <th>Item</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order, index) => (
                        <tr key={index}>
                            <td>{order.tableNumber}</td>
                            <td>{order.item}</td>
                            {order.status == 'cooked' ? 
                            (<button className='serve-btn'>Ready to serve</button>) :  (<td className={`status-${order.status.toLowerCase().replace(/\s+/g, '-')}`}>{order.status}</td>)}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className='notifications-container'>
                <h2>Notifications</h2>
                {notifs.map((notif, index) => (
                        <div key={index} className='notif'>
                            <h4>{notif.msg}</h4>
                            {notif.status == 'unfulfilled' ? 
                            (<button className="done-btn">Done</button>) : null }
                        </div>
                ))}
            </div>
        </div>
    );
};

export default WaiterPage;