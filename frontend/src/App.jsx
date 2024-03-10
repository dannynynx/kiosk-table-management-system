import './App.css'
import CustomerPage from './pages/CustomerPage.jsx';
import LogInPage from "./pages/LogInPage.jsx";
import KioskPage from "./pages/KioskPage.jsx";

import { Routes, Route } from 'react-router-dom';

const App = () => {
    return (
        <>
            <Routes>
                <Route path='/kiosk' element={<KioskPage />} />
                <Route path='/login' element={<LogInPage />} />
                <Route path='/menu' element={<CustomerPage display={'menu'}/>} />
                <Route path='/menu/:id' element={<CustomerPage display={'item'}/>} />
            </Routes>
        </>
    );
};

export default App;
