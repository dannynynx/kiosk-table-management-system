import './ManagerStatsPage.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PopUp from '../components/PopUp';
import axios from 'axios';

const ManagerStatsPage = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState([]);

    const handleGoBack = () => { 
        navigate('/manager');
    }

    const handleSelectDates = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target); 

        const data = { 
            start_date: formData.get("start_date"),
            end_date: formData.get("end_date")
        }

        try {
            const dates = {
                "start_date": data.start_date,
                "end_date": data.end_date
            }
            console.log(dates)
            const response = await axios.get( `http://127.0.0.1:5000/manager/get_stats?start_date=${data.start_date}&end_date=${data.end_date}`)
            
            await setStats(response.data)
            
            console.log(stats)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
        <div className='manager-stats-page'>
            <div className='manager-stats-top-bar'>
                <button onClick={handleGoBack} className='manager-go-back-btn'>Go Back</button>
                <h1>Stats</h1>
            </div>
            <form onSubmit={handleSelectDates} className='manager-stats-date-form'>
                Starting Date:
                <input type="date" name="start_date"/>
                Ending Date:
                <input type="date" name="end_date"/>
                <button type="submit" className='manager-submit-date-btn'> Submit </button>
            </form>
            <table className='manager-stats-table'>
                <thead>
                <tr>
                    <th>Date</th>
                    <th># Customers</th>
                    <th># Items</th>
                    <th>Gross Revenue</th>
                    <th>Most Popular Item</th>
                </tr>
                </thead>
                <tbody>
                {(stats !== null) ? (
        stats.map((session, index) => {
                return (
                    <tr key={index}>
                        <td>{session.date}</td>
                        <td>{session.number_customers}</td>
                        <td>{session.number_items}</td>
                        <td>{session.gross_revenue}</td>
                        <td>{session.popular_item}</td>
                    </tr>
                );
        })
    ) : (
        <tr>
            <td colSpan="5">There are no stats selected currently.</td>
        </tr>
    )}  
    </tbody>
    </table>
           
        </div>
        </>
            
    );
};

export default ManagerStatsPage;