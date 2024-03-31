import './WaiterPage.css';
import {useState} from "react";

const WaiterPage = () => {
    const [orders, setOrders] = useState([
        {
            tableNumber: 1,
            item: 'Pizza',
            status: 'Served'
        },
        {
            tableNumber: 3,
            item: 'Pasta',
            status: 'Ready to Serve'
        },
        {
            tableNumber: 2,
            item: 'Burger',
            status: 'Cooking in Progress'
        },
        {
            tableNumber: 1,
            item: 'Sushi',
            status: 'Ordered'
        },
        {
            tableNumber: 1,
            item: 'Pizza',
            status: 'Served'
        },
        {
            tableNumber: 3,
            item: 'Pasta',
            status: 'Ready to Serve'
        },
        {
            tableNumber: 2,
            item: 'Burger',
            status: 'Cooking in Progress'
        },
        {
            tableNumber: 1,
            item: 'Sushi',
            status: 'Ordered'
        },
        {
            tableNumber: 1,
            item: 'Pizza',
            status: 'Served'
        },
        {
            tableNumber: 3,
            item: 'Pasta',
            status: 'Ready to Serve'
        },
        {
            tableNumber: 2,
            item: 'Burger',
            status: 'Cooking in Progress'
        },
        {
            tableNumber: 1,
            item: 'Sushi',
            status: 'Ordered'
        },
        {
            tableNumber: 1,
            item: 'Pizza',
            status: 'Served'
        },
        {
            tableNumber: 3,
            item: 'Pasta',
            status: 'Ready to Serve'
        },
        {
            tableNumber: 2,
            item: 'Burger',
            status: 'Cooking in Progress'
        },
        {
            tableNumber: 1,
            item: 'Sushi',
            status: 'Ordered'
        },
        {
            tableNumber: 1,
            item: 'Pizza',
            status: 'Served'
        },
        {
            tableNumber: 3,
            item: 'Pasta',
            status: 'Ready to Serve'
        },
        {
            tableNumber: 2,
            item: 'Burger',
            status: 'Cooking in Progress'
        },
        {
            tableNumber: 1,
            item: 'Sushi',
            status: 'Ordered'
        },
        {
            tableNumber: 1,
            item: 'Pizza',
            status: 'Served'
        },
        {
            tableNumber: 3,
            item: 'Pasta',
            status: 'Ready to Serve'
        },
        {
            tableNumber: 2,
            item: 'Burger',
            status: 'Cooking in Progress'
        },
        {
            tableNumber: 1,
            item: 'Sushi',
            status: 'Ordered'
        },
        {
            tableNumber: 1,
            item: 'Pizza',
            status: 'Served'
        },
        {
            tableNumber: 3,
            item: 'Pasta',
            status: 'Ready to Serve'
        },
        {
            tableNumber: 2,
            item: 'Burger',
            status: 'Cooking in Progress'
        },
        {
            tableNumber: 1,
            item: 'Sushi',
            status: 'Ordered'
        },
        {
            tableNumber: 1,
            item: 'Pizza',
            status: 'Served'
        },
        {
            tableNumber: 3,
            item: 'Pasta',
            status: 'Ready to Serve'
        },
        {
            tableNumber: 2,
            item: 'Burger',
            status: 'Cooking in Progress'
        },
        {
            tableNumber: 1,
            item: 'Sushi',
            status: 'Ordered'
        },
    ]);

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
                            {order.status == 'Ready to Serve' ? 
                            (<button className='serve-btn'>Ready to serve</button>) :  (<td>{order.status}</td>)}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className='notifications-container'>
                <h2>Notifications</h2>
                <p>Assistance: #1</p>
                <div>Done</div>
            </div>
        </div>
    );
};

export default WaiterPage;