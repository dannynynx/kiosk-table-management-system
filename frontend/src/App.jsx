import './App.css'
import CustomerPage from './pages/CustomerPage.jsx';
import LogInPage from "./pages/LogInPage.jsx";
import KioskPage from "./pages/KioskPage.jsx";

import { Routes, Route } from 'react-router-dom';
import MenuProvider from "./context/MenuContext.jsx";
import CartProvider from "./context/CartContext.jsx";
import PastOrdersProvider from "./context/PastOrdersContext.jsx";

const App = () => {
    return (
        <>
            <Routes>
                <Route path='/kiosk' element={<KioskPage />} />
                <Route path='/login' element={<LogInPage />} />

                <Route path='/menu' element={
                    <MenuProvider>
                        <CartProvider>
                            <PastOrdersProvider>
                                <CustomerPage display={'menu'}/>
                            </PastOrdersProvider>
                        </CartProvider>
                    </MenuProvider>
                } />

                <Route path='/menu/:id' element={<CustomerPage display={'item'}/>} />
            </Routes>
        </>
    );
};

export default App;
