import './KioskPage.css';

const KioskPage = () => {
    return (
        <>
            <body>
                <div className='top-container'>
                    <h1 className='kiosk-title'>Blue<br></br>Zebra</h1>
                </div>
                <div className='bottom-container'>
                    <input type='button' className='kiosk-button' value='Select Table'></input>
                </div>
            </body>
        </>
    );
};

export default KioskPage;