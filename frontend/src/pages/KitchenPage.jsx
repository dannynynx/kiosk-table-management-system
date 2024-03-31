import './KitchenPage.css';
import { useState } from "react";

const KitchenPage = () => {
    const [orders, setOrders] = useState([
        {
            tableNumber: 1,
            item: 'Pizza',
            status: 'start'
        },
        {
            tableNumber: 2,
            item: 'Pasta',
            status: 'start'
        },
        {
            tableNumber: 3,
            item: 'Burger',
            status: 'start'
        },
        {
            tableNumber: 4,
            item: 'Sushi',
            status: 'preparing'
        },
    ]);

    const handleStart = (order) => { 
        //send a request back to backend to change the status 
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
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order, index) => (
                    <tr key={index}>
                        <td>{order.tableNumber}</td>
                        <td>{order.item}</td>
                        {order.status == "start" ? (
                            <td><button className='start-btn' onClick={handleStart(order)}>Start</button></td>) : 
                            order.status == "preparing" ? 
                         (<td style={{color: 'orange'}}>Preparing <button className='finish-btn'>Finish</button></td>) : ""}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default KitchenPage;