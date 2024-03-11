import './KioskPage.css';
import TablePreview from '../components/TablePreview';

const KioskPage = () => {

    const selectTableButton = () => {
        document.getElementById('first-page').style.display = "none";
        document.getElementById('selection-page').style.display = "flex";
    };

    return (
        <>
            <body>
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
                        <TablePreview tableNumber={'1'}></TablePreview>
                        <TablePreview tableNumber={'2'}></TablePreview>
                        <TablePreview tableNumber={'3'}></TablePreview>
                        <TablePreview tableNumber={'4'}></TablePreview>
                        <TablePreview tableNumber={'5'}></TablePreview>
                        <TablePreview tableNumber={'6'}></TablePreview>
                        <TablePreview tableNumber={'7'}></TablePreview>
                        <TablePreview tableNumber={'8'}></TablePreview>
                        <TablePreview tableNumber={'9'}></TablePreview>
                        <TablePreview tableNumber={'10'}></TablePreview>
                        <TablePreview tableNumber={'11'}></TablePreview>
                        <TablePreview tableNumber={'12'}></TablePreview>
                        <TablePreview tableNumber={'13'}></TablePreview>
                    </div>
                </section>
            </body>
        </>
    );
};

export default KioskPage;