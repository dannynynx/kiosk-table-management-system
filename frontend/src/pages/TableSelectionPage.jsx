import './TableSelectionPage.css';
import TablePreview from '../components/TablePreview';
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PopUp from '../components/KioskPopUp';
import CodePopUp  from '../components/KioskCodePopUp';
import socket from '../socket'
import tableIconSmall from '../assets/table-small-icon.svg';
import tableIconMedium from '../assets/table-medium-icon.svg';
import tableIconLarge from '../assets/table-large-icon.svg';
import tableIconOccupied from '../assets/table-occupied-icon.svg';


const TableSelectionPage = () => {
    const [tables, setTables] = useState([]);
    const [code, setCode] = useState("1234");
    const [isPopUpVisible, setPopUpVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [isCodeVisible, setCodeVisible] = useState(false);
    const [restaurantColour, getRestaurantColour] = useState("black")

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/customer/show_table')
            .then(response => {
                setTables(response.data);
            })
            .catch(error => {
                console.error('Error fetching tables:', error);
            }
        );

        socket.on('updated_table_status', (data) => {
            setTables(data);
        });

        socket.on('table_code', (data) => {
            setCode(data);
        });

        getColourCustomisations()
    }, []);

    const getColourCustomisations = () => {
        axios.get('http://127.0.0.1:5000/manager/get_customisations')
        .then(response => {
            const data = response.data;
            getRestaurantColour(data.primary_colour)
        })
        .catch(error => {
            console.error('Error fetching customisation:', error);
        });
    }

    const getTablePicture = (size, avail) => {
        if (avail == 0) {
            switch (size) {
                case 1:
                    return tableIconSmall;
                case 2:
                    return tableIconMedium;
                case 3:
                    return tableIconLarge;
            }
        } else {
            return tableIconOccupied;
        }
    };

    const handleConfirmTable = (number, avail) => {
        if (avail == 0) {
            const confirmMessage = "You have selected Table #" + number
            setPopupMessage(confirmMessage);
            setPopUpVisible(true);
        }
    };

    const closePopUp = () => {
        setPopUpVisible(false);
    };

    const closeCodePopUp = () => {
        setCodeVisible(false);
    };

    const handleConfirmSelection = async (tableNumber) => {
        socket.emit('table_confirmation', tableNumber);
        setCodeVisible(true);
    };

    return (
        <>
            <section className='table-selection-page'>
                <div className='table-selection-top-bar' style={{ backgroundColor: restaurantColour }}>
                    <Link className='table-selection-back-button-container' to="/kiosk">
                        <input type='button' className='table-selection-back-button' value='Go Back'></input>
                    </Link>
                    <div className='table-selction-title-container'>
                        <h1 className='table-selection-title'>Select Table</h1>
                    </div>
                </div>
                <div className='table-selection-container'>
                    {tables.map((table) => (
                        <TablePreview key={table.id} tableNumber={table.id} colour={table.avail == 0 ? '#DBDCDE' : '#767A7B' } tablePicture={getTablePicture(table.size, table.avail)} onClick={() => handleConfirmTable(table.id.toString(), table.avail)}></TablePreview>))}
                    {isPopUpVisible && (
                        <PopUp message={popupMessage} onClose={closePopUp} isPopUpVisible={isPopUpVisible} nextStep={handleConfirmSelection}/>
                    )}
                    {isCodeVisible && (
                        <CodePopUp tableCode={code} onClose={closeCodePopUp} isPopUpVisible={isCodeVisible}/>
                    )}
                </div>
            </section>

        </>
    );
};

export default TableSelectionPage;