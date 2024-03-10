import './KioskPage.css';

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
                    <h1 className='selection-title'>Select Table</h1>
                </section>
            </body>
        </>
    );
};

export default KioskPage;