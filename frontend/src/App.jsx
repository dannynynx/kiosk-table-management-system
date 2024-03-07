import './App.css'
import Menu from './pages/Menu';
import LogIn from "./pages/LogIn.jsx";
import Kiosk from "./pages/Kiosk.jsx";

import { BrowserRouter ,  Routes, Route } from 'react-router-dom';

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/kiosk" element={<Kiosk />} />
                    <Route path="/login" element={<LogIn />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
