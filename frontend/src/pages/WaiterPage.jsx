import './WaiterPage.css';
import {useEffect, useState} from "react";
import axios from "axios";

const WaiterPage = () => {
    const [notifs, setNotifs] = useState([])
    const token = { 'token': localStorage.getItem('token')};
    const [orders, setOrders] = useState([]);

    const getOrders = () => {
        axios.get('http://127.0.0.1:5000/staff/show_orders', token)
        .then(response => {
            const data = response.data ?? [];
            console.log(data);
            setOrders(data);
        })
        .catch(error => {
            console.error('Error fetching orders:', error);
        })
    }


    const getNotifs = () => {
        axios.get('http://127.0.0.1:5000/waitstaff/get_notification_status', token)
        .then(response => {
            const data = response.data ?? [];
            console.log(data);
            setNotifs(data);
        }).catch(error => { 
            console.error('Error fetching notifications:', error);
        });
    }

    useEffect(() => { 
        getOrders();
        getNotifs();
    }, []);

    const handleStatusChange = (order) => { 
        console.log(order)
        let status = null;

        if (order.status == "cooked") { 
            status = "served";
        } 
        const data = { 
            status,
            item_id: order.item_id,
            order_id: order.order_id,
            quantity: order.quantity,
        }

        console.log(data)

        axios.put('http://127.0.0.1:5000/staff/update_order_status', data)
        .then(response => { 
            console.log(response);
            getOrders();
        }).catch(error => { 
            console.error('Error fetching orders:', error);
        });
    }

    const handleNotifStatusChange = (notif) => { 
        console.log(notif)
     
        const data = { 
            new_status: "closed",
            notification_id: notif.notification_id,
            token: localStorage.getItem('token')
        }

        console.log(data)
        axios.put('http://127.0.0.1:5000/waitstaff/update_notification_status', data)
        .then(response => { 
            console.log(response);
            getNotifs();
        }).catch(error => { 
            console.error('Error fetching notifications:', error);
        });
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
                            {order.status == 'cooked' ? 
                            (<button className='serve-btn' onClick={() => handleStatusChange(order)}>Ready to serve</button>) :  (<td className={`status-${order.status.toLowerCase().replace(/\s+/g, '-')}`}>{order.status}</td>)}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className='notifications-container'>
                <h2>Notifications</h2>
                {notifs.map((notif, index) => {
                if (notif.status =="new") {
                    return (
                        <div key={index} className='notif'>
                                    <h4>Table #{notif.table_id}: {notif.notification_type}</h4>
                                    {notif.status == 'new' ? 
                                    (<button className="done-btn" onClick={() => handleNotifStatusChange(notif)}>Done</button>) : "closed" }
                                </div>
                    )} else { 
                        null
                    }})}
            </div>
        </div>
    );
};

export default WaiterPage;