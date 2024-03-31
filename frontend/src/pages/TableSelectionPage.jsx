import './TableSelectionPage.css';
import TablePreview from '../components/TablePreview';
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import tableIconSmall from '../assets/table-small-icon.svg';
import tableIconMedium from '../assets/table-medium-icon.svg';
import tableIconLarge from '../assets/table-large-icon.svg';
import tableIconOccupied from '../assets/table-occupied-icon.svg';


const TableSelectionPage = () => {
    const [tables, setTables] = useState([])

    useEffect(() => {
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
        selectTable().then(() => console.log(tables));
    }, []);

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
            return tableOccupiedIcon;
        }
    };

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
                        <TablePreview tableNumber={table.id} colour={table.avail == 0 ? '#DBDCDE' : '#767A7B' } tablePicture={getTablePicture(table.size, table.avail)}></TablePreview>))}
                </div>
            </section>

        </>
    );
};

export default TableSelectionPage;