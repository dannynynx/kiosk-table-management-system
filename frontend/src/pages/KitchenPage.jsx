import './KitchenPage.css';
import { useEffect, useState } from "react";
import axios from "axios";
import socket from '../socket';

const KitchenPage = () => {
    const [orders, setOrders] = useState([]);

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

        socket.on('updated_order_status', (data) => {
            setOrders(data);
        });
    }, []);

    const handleStatusChange = (order) => { 
        console.log(order)
        let status = null;

        if (order.status === "ordered") {
            status = "cooking";
        } else if (order.status === "cooking") {
            status = "cooked";
        }

        const data = { 
            status,
            item_id: order.item_id,
            order_id: order.order_id,
            quantity: order.quantity,
        }

        socket.emit('update_order_status', data);
    }


    return (
        <div className='kitchen-page'>
            <div className='logout-btn'>Log Out</div>
            <table className='kitchen-table'>
                <caption>Dishes to cook</caption>
                <thead>
                <tr>
                    <th>Table Number</th>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {!(orders.length === 0) ? (
    orders.map((order, index) => {
        if ((order.status !== "cooked") && (order.status !== "served")) {
            return (
                <tr key={index}>
                    <td>{order.table_number}</td>
                    <td>{order.name}</td>
                    <td>{order.quantity}</td>
                    {order.status === "ordered" ? (
                        <td>
                            <button className='start-btn' onClick={() => handleStatusChange(order)}>Start</button>
                        </td>
                    ) : order.status === "cooking" ? (
                        <td style={{color: 'orange'}}>Preparing <button className='finish-btn' onClick={() => handleStatusChange(order)}>Finish</button></td>
                    ) : null}
                </tr>
            );
        } else {
            return null;
        }
    })
) : (
    <tr>
        <td colSpan="4">There are no orders currently.</td>
    </tr>
)}
                </tbody>
            </table>
        </div>
    );
};

export default KitchenPage;