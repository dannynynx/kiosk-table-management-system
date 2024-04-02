import './KioskPage.css';
import TablePreview from '../components/TablePreview';
import {useState} from "react";
import axios from "axios";

const KioskPage = () => {
    const [tableNumber, setTableNumber] = useState({table_id: null});
    const [code, setCode] = useState(null);
    const [tables, setTables] = useState([])
    const confirmTableSelection = async (tableNumber)=> {
        try {
            const data = {"table_id": tableNumber}
            console.log(data)
            const response = await axios.post( 'http://127.0.0.1:5000/customer/table_confirmation', data);
            // console.log(response.data.code);
        } catch (error) {
            console.error('Error submitting data:', error);
            return null;
        }
    }

    const getTableCode = async (tableNumber)=> {
        try {
            const data = {'table_id': tableNumber.table_id}
            console.log(data)
            const response = await axios.get( `http://127.0.0.1:5000/customer/table_code?table_id=${tableNumber.table_id}`);
            const rawCode = response.data;
            setCode(rawCode)
        } catch (error) {
            console.error('Error submitting data:', error);
            return null;
        }
    }

    const selectTable = async ()=> {
        try {
            const response = await axios.get( 'http://127.0.0.1:5000/customer/showTable');
            setTables(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error submitting data:', error);
            return null;
        }
    }

    const selectTableButton = () => {
        document.getElementById('first-page').style.display = "none";
        document.getElementById('selection-page').style.display = "flex";
        selectTable();
    };

    const confirmTable = (tableNumber) => {
        setTableNumber({table_id: tableNumber});
        document.getElementById('table-confirmation-page').style.display = "flex";
        document.getElementById('popup-text').textContent = "You have selected Table #" + tableNumber;
        confirmTableSelection(tableNumber);
    }

    const goBackTableSelection = () => {
        setTableNumber({table_id: null});
        document.getElementById('table-confirmation-page').style.display = "none";
    }

    const tableCodePage = () => {
        getTableCode(tableNumber);
        document.getElementById('table-confirmation-page').style.display = "none";
        document.getElementById('selection-page').style.display = "none";
        document.getElementById('table-code-page').style.display = "flex";
    }

    return (
        <>
            <section className='first-page' id='first-page'>
                <div className='top-container'>
                    <h1 className='kiosk-title'>Blue<br></br>Zebra</h1>
                </div>
                <div className='bottom-container'>
                    <input type='button' className='kiosk-button' value='Select Table' onClick={selectTableButton}></input>
                </div>
            </section>
            <section className='selection-page' id='selection-page'>
                <div className='top-bar'>
                    <h1 className='selection-title'>Select Table</h1>
                </div>
                <div className='table-selection-container'>
                    {tables.map((table) => (
                        <TablePreview key={table.id} tableNumber={table.id} colour={table.avail == 0 ? 'green' : 'red'}
                            onClick={() => confirmTable(table.id)}
                        />
                    ))}
                </div>
            </section>
            <section className='confirmation-page' id='table-confirmation-page'>
                <div className='popup-box'>
                    <h1 className='popup-font' id='popup-text'></h1>
                    <input type='button' value="confirm" className='confirm-button' onClick={tableCodePage}></input>
                    <input type='button' value="cancel" className='confirm-button' onClick={goBackTableSelection}></input>
                </div>
            </section>
            <section className='table-code-page' id='table-code-page'>
                <div className='code-top-container'>
                    <h1 className='kiosk-title'>Blue<br></br>Zebra</h1>
                </div>
                <div className='code-bottom-container'>
                    <h2>Your table code is:</h2>
                    <h2>{code}</h2>
                </div>
            </section>
        </>
    );
};

export default KioskPage;