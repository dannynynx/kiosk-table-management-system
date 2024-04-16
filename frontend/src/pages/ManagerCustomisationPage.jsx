import './ManagerCustomisationPage.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";

const ManagerCustomisationPage = () => {
    const [formData, setFormData] = useState({ hex: '' });
    const [restaurantColour, getRestaurantColour] = useState("black")
    const [restaurantSecondaryColour, getRestaurantSecondaryColour] = useState("black")
    const [restaurantId, getRestaurantId] = useState("")
    const [restaurantLogo, getRestaurantLogo] = useState("")
    const [textColor, setTextColor] = useState('#000000');
    const [codeText, setCodeText] = useState('New Hex Colour:');
    const navigate = useNavigate();

    const handleClose = () => {
        navigate('/manager')
    }

    const handleSaves = async () => {
        const hexRegex = /^#?([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/;
        if (hexRegex.test(formData.hex)) {
            try {
                const newData = { id: restaurantId , logo: restaurantLogo , primary_colour: formData.hex, secondary_colour: restaurantSecondaryColour }
                const response = await axios.put( 'http://127.0.0.1:5000/manager/edit_customisation', newData);
                console.log(response)
                handleClose();
            } catch (error) {
                console.log(error)
            }
        } else {
            setTextColor('#d33d3d')
            setCodeText("New Hex Colour: Invalid Hex.")
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/manager/get_customisations')
        .then(response => {
            const data = response.data;
            getRestaurantColour(data.primary_colour)
            getRestaurantId(data.id)
            getRestaurantLogo(data.logo)
            getRestaurantSecondaryColour(data.secondary_colour)
        })
        .catch(error => {
            console.error('Error fetching customisation:', error);
        });
    }, [getRestaurantColour]);

    return (
        <>
            <div className='manager-customisation-page' style={{ backgroundColor: restaurantColour }}>
                <div className='manager-customisation-container'>
                    <h1 className="manager-customisation-title">Restaurant Customisation</h1>
                    <h1  style={{ color: textColor }}>{codeText}</h1>
                    <input type="text" className="manager-customisation-text-box" id='hex' name="hex" onChange={handleChange}/>
                    <div className="manager-customisation-button-div">
                        <input type="button" className="manager-customisation-button" value="Close" onClick={handleClose}/>
                        <input type="button" className="manager-customisation-button" value="Save Changes" onClick={handleSaves}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ManagerCustomisationPage;