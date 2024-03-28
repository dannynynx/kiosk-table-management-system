import './KitchenPage.css';
import { useState } from "react";

const KitchenPage = () => {
    const [orders, setOrders] = useState([
        {
            tableNumber: 1,
            item: 'Pizza',
            status: 'Start'
        },
        {
            tableNumber: 2,
            item: 'Pasta',
            status: 'Start'
        },
        {
            tableNumber: 3,
            item: 'Burger',
            status: 'Start'
        },
    ]);

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
                        <td>{order.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default KitchenPage;