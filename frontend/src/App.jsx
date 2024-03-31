import './App.css'
import CustomerPage from './pages/CustomerPage.jsx';
import LogInPage from "./pages/LogInPage.jsx";
import KioskPage from "./pages/KioskPage.jsx";
import KioskAuthenticationPage from "./pages/KioskAuthenticationPage.jsx";
import KitchenPage from "./pages/KitchenPage.jsx";

import { Routes, Route } from 'react-router-dom';
import MenuProvider from "./context/MenuContext.jsx";
import CartProvider from "./context/CartContext.jsx";
import PastOrdersProvider from "./context/PastOrdersContext.jsx";
import WaiterPage from "./pages/WaiterPage.jsx";
import axios from 'axios';


const App = () => {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    
    return (
        <>
            <Routes>
                <Route path='/kiosk' element={<KioskPage />} />
                <Route path='/login' element={<LogInPage />} />
                <Route path='kiosk/authentication' element={<KioskAuthenticationPage />} />
                <Route path='/menu' element={
                    <MenuProvider>
                        <CartProvider>
                            <PastOrdersProvider>
                                <CustomerPage display={'menu'}/>
                            </PastOrdersProvider>
                        </CartProvider>
                    </MenuProvider>
                } />

                <Route path='/menu/:id' element={
                    <MenuProvider>
                        <CartProvider>
                            <PastOrdersProvider>
                                <CustomerPage display={'item'}/>
                            </PastOrdersProvider>
                        </CartProvider>
                    </MenuProvider>
                } />
                <Route path='/kitchen' element={<KitchenPage />} />
                <Route path='/waiter' element={<WaiterPage />} />
            </Routes>
        </>
    );
};

export default App;
