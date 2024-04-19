import './KioskPage.css';
import zebra from "../assets/zebra-kiosk.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const KioskPage = () => {
    const [restaurantColour, getRestaurantColour] = useState("black")

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/manager/get_customisations')
        .then(response => {
            const data = response.data;
            getRestaurantColour(data.primary_colour)
        })
        .catch(error => {
            console.error('Error fetching customisation:', error);
        });
    }, [getRestaurantColour]);

    return (
        <>
            <section className='kiosk-container'>
                <div className='kiosk-company-info'>
                    <img className="kiosk-logo" src={zebra} alt='Zebra Icon'></img>
                    <h1 className='kiosk-title' style={{ color: restaurantColour }}>Blue<br></br>Zebra</h1>
                </div>
                <Link className='kiosk-button-container' to="/kiosk/table-selection">
                    <input type='button' className='kiosk-button' value='Select Table' style={{ backgroundColor: restaurantColour }}></input>
                </Link>
            </section>
        </>
    );
};

export default KioskPage;