import './KitchenPage.css';
import { useEffect, useState } from "react";
import axios from "axios";

const KitchenPage = () => {
    const token = { 'token': localStorage.getItem('token')};
    const [orders, setOrders] = useState([]);

    useEffect(() => { 

        axios.get('http://127.0.0.1:5000/staff/show_orders', token)
        .then(response => {
            const data = response.data ?? [];
            console.log(data);
            setOrders(data);
        })
        .catch(error => {
            console.error('Error fetching orders:', error);
        });
    }, []);

    const handleStatusChange = (order) => { 
        //later
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
                {!(orders.length === 0) ? (orders.map((order, index) => (
                    <tr key={index}>
                        <td>{order.tableNumber}</td>
                        <td>{order.item}</td>
                        {order.status == "start" ? (
                            <td><button className='start-btn' onClick={handleStatusChange(order)}>Start</button></td>) : 
                            order.status == "preparing" ? 
                         (<td style={{color: 'orange'}}>Preparing <button className='finish-btn'>Finish</button></td>) : ""}
                    </tr>
                ))) : <h4>There are no orders currently.</h4>}
                </tbody>
            </table>
        </div>
    );
};

export default KitchenPage;