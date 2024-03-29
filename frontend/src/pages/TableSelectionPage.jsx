import './TableSelectionPage.css';
import TablePreview from '../components/TablePreview';
import { useEffect, useState } from "react";
import axios from "axios";


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
        generateCode();
        selectTable().then(() => console.log(tables));
    }, []);

    return (
        <>
            <section className='table-selection-page'>
                <div className='table-selection-top-bar'>
                    <input type='button' className='table-selection-back-button' value='Go Back'></input>
                    <div className='table-selction-title-container'>
                        <h1 className='table-selection-title'>Select Table</h1>
                    </div>
                </div>
                <div className='table-selection-container'>
                    {tables.map((table, key) => (
                        <TablePreview tableNumber={table.id} colour={table.avail == 0 ? '#DBDCDE' : 'red'}></TablePreview>))}
                </div>
            </section>

        </>
    );
};

export default TableSelectionPage;