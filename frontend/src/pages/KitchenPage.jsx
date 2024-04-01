import './KitchenPage.css';
import { useEffect, useState } from "react";
import axios from "axios";

const KitchenPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => { 
        const fetchData = async () => { 
            try { 
                const token = { "token": localStorage.getItem('token')};
                const response = await axios.get('http://127.0.0.1:5000/kitchen/get_order_status', token);
                const data = response.data;
                console.log(data);
                setOrders(data);
            } catch (error) { 
                console.error('Error fetching orders:', error);
            }
        };
    },[])

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
                {orders.map((order, index) => (
                    <tr key={index}>
                        <td>{order.tableNumber}</td>
                        <td>{order.item}</td>
                        {order.status == "start" ? (
                            <td><button className='start-btn' onClick={handleStatusChange(order)}>Start</button></td>) : 
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