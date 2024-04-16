import './WaiterPage.css';
import { useEffect, useState } from "react";
import axios from "axios";
import socket from '../socket'
import WaitBillPopUp from "../components/WaitBillPopUp.jsx"

const WaiterPage = () => {
    const [notifs, setNotifs] = useState([])
    const [orders, setOrders] = useState([]);
    const [isPopUpVisible, setPopUpVisible] = useState(false);
    const [currBill, setCurrBill] = useState(null);

    useEffect(() => {
        const token = { 'token': localStorage.getItem('token')};
        axios.get('http://127.0.0.1:5000/staff/show_orders', token)
            .then(response => {
                const data = response.data ?? [];
                setOrders(data);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
            })

        axios.get('http://127.0.0.1:5000/waitstaff/get_notification_status', token)
            .then(response => {
                const data = response.data ?? [];
                setNotifs(data);
            }).catch(error => {
            console.error('Error fetching notifications:', error);
        });

        socket.on('updated_order_status', (data) => {
            setOrders(data);
        });
        
        socket.on('updated_notification_status', (data) => {
            setNotifs(data);
        });
    }, []);

    const handleStatusChange = (order) => {
        let status = null;

        if (order.status === "cooked") {
            status = "served";
        } 
        const data = { 
            status,
            item_id: order.item_id,
            order_id: order.order_id,
            quantity: order.quantity,
        }


        // TODO: error handling of socket.emit
        socket.emit('update_order_status', data);
    }

    const closePopUp = () => {
        setPopUpVisible(false);
    };

    const handleNotifStatusChange = (notif) => {
        if (notif.notification_type == "bill") { 
            setPopUpVisible(true);
            setCurrBill(notif.table_id)
        } else { 
            const data = { 
                new_status: "closed",
                notification_id: notif.notification_id,
                token: localStorage.getItem('token')
            }
    
            socket.emit('update_notification_status', data);
        }


        
    }
    
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
                            <td>{order.table_number}</td>
                            <td>{order.name}</td>
                            {order.status === 'cooked' ?
                            (<button className='serve-btn' onClick={() => handleStatusChange(order)}>Ready to serve</button>) :  (<td className={`status-${order.status.toLowerCase().replace(/\s+/g, '-')}`}>{order.status}</td>)}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className='notifications-container'>
                <h2>Notifications</h2>
                {notifs.map((notif, index) => {
                if (notif.status ==="new") {
                    return (
                        <div key={index} className='notif'>
                                    <h4>Table #{notif.table_id}: {notif.notification_type}</h4>
                                    {notif.status === 'new' ?
                                    (<button className="done-btn" onClick={() => handleNotifStatusChange(notif)}>Done</button>) : "closed" }
                                </div>
                    )} else { 
                        null
                    }})}
            </div>
            {isPopUpVisible && (
                <WaitBillPopUp onClose={closePopUp} isPopUpVisible={isPopUpVisible} table={currBill}/>
            )}
        </div>
    );
};

export default WaiterPage;