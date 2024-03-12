import './KioskPage.css';
import TablePreview from '../components/TablePreview';

const KioskPage = () => {

    const selectTableButton = () => {
        document.getElementById('first-page').style.display = "none";
        document.getElementById('selection-page').style.display = "flex";
    };

    const confirmTable = (tableNumber) => {
        document.getElementById('table-confirmation-page').style.display = "flex";
        document.getElementById('popup-text').textContent = "You have selected Table #" + tableNumber;
    }

    const goBackTableSelection = () => {
        document.getElementById('table-confirmation-page').style.display = "none";
    }

    const tableCodePage = () => {
        document.getElementById('table-confirmation-page').style.display = "none";
        document.getElementById('selection-page').style.display = "none";
        document.getElementById('table-code-page').style.display = "flex";
    }

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
                        <TablePreview tableNumber={'1'} onClick={() => confirmTable('1')}></TablePreview>
                        <TablePreview tableNumber={'2'} onClick={() => confirmTable('2')}></TablePreview>
                        <TablePreview tableNumber={'3'} onClick={() => confirmTable('3')}></TablePreview>
                        <TablePreview tableNumber={'4'} onClick={() => confirmTable('4')}></TablePreview>
                        <TablePreview tableNumber={'5'} onClick={() => confirmTable('5')}></TablePreview>
                        <TablePreview tableNumber={'6'} onClick={() => confirmTable('6')}></TablePreview>
                        <TablePreview tableNumber={'7'} onClick={() => confirmTable('7')}></TablePreview>
                        <TablePreview tableNumber={'8'} onClick={() => confirmTable('8')}></TablePreview>
                        <TablePreview tableNumber={'9'} onClick={() => confirmTable('9')}></TablePreview>
                        <TablePreview tableNumber={'10'} onClick={() => confirmTable('10')}></TablePreview>
                        <TablePreview tableNumber={'11'} onClick={() => confirmTable('11')}></TablePreview>
                        <TablePreview tableNumber={'12'} onClick={() => confirmTable('12')}></TablePreview>
                        <TablePreview tableNumber={'13'} onClick={() => confirmTable('13')}></TablePreview>

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
                        <h2>X X X X</h2>
                    </div>
                </section>
            </body>
        </>
    );
};

export default KioskPage;