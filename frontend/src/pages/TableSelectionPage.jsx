import './TableSelectionPage.css';
import TablePreview from '../components/TablePreview';
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PopUp from '../components/KioskPopUp';
import CodePopUp  from '../components/KioskCodePopUp';

import tableIconSmall from '../assets/table-small-icon.svg';
import tableIconMedium from '../assets/table-medium-icon.svg';
import tableIconLarge from '../assets/table-large-icon.svg';
import tableIconOccupied from '../assets/table-occupied-icon.svg';


const TableSelectionPage = () => {
    const [tables, setTables] = useState([]);
    const [code, setCode] = useState(null);
    const [isPopUpVisible, setPopUpVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [isCodeVisible, setCodeVisible] = useState(false);
    const [codeMessage, setCodeMessage] = useState("");

    useEffect(() => {
        const selectTable = async ()=> {
            try {
                const response = await axios.get( 'http://127.0.0.1:5000/customer/showTable');
                setTables(response.data);
            } catch (error) {
                console.error('Error submitting data:', error);
                return null;
            }
        }
        selectTable().then(() => console.log(tables));
    }, []);

    const generateCode = async (tableNumber)=> {
        try {
            const response = await axios.post( 'http://127.0.0.1:5000/customer/table_confirmation', tableNumber);
            const rawCode = response.data.code;
            setCode(rawCode);
            console.log(response.data.code);
        } catch (error) {
            console.error('Error submitting data:', error);
            return null;
        }
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

    const handleConfirmSelection = (tableNumber) => {
        setPopUpVisible(false);
        generateCode(tableNumber);
        setCodeMessage(code);
        setCodeVisible(true);
        confirmTableSelection(tableNumber);
    };

    const confirmTableSelection = async (tableNumber)=> {
        try {
            const response = await axios.post( 'http://127.0.0.1:5000/customer/confirmTable', tableNumber);
            console.log(response.data);
        } catch (error) {
            console.error('Error submitting data:', error);
            return null;
        }
    }
    return (
        <>
            <section className='table-selection-page'>
                <div className='table-selection-top-bar'>
                    <Link className='table-selection-back-button-container' to="/kiosk">
                        <input type='button' className='table-selection-back-button' value='Go Back'></input>
                    </Link>
                    <div className='table-selction-title-container'>
                        <h1 className='table-selection-title'>Select Table</h1>
                    </div>
                </div>
                <div className='table-selection-container'>
                    {tables.map((table, key) => (
                        <TablePreview tableNumber={table.id} colour={table.avail == 0 ? '#DBDCDE' : '#767A7B' } tablePicture={getTablePicture(table.size, table.avail)} onClick={() => handleConfirmTable(table.id.toString(), table.avail)}></TablePreview>))}
                        {isPopUpVisible && (
                            <PopUp message={popupMessage} onClose={closePopUp} isPopUpVisible={isPopUpVisible} nextStep={handleConfirmSelection}/>
                        )}
                        {isCodeVisible && (
                            <CodePopUp message={codeMessage} onClose={closeCodePopUp} isPopUpVisible={isCodeVisible} nextStep={handleConfirmSelection}/>
                        )}
                </div>
            </section>

        </>
    );
};

export default TableSelectionPage;