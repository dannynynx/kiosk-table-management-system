import './App.css'
import CustomerPage from './pages/CustomerPage.jsx';
import LogInPage from "./pages/LogInPage.jsx";
import KioskPage from "./pages/KioskPage.jsx";
import KioskAuthenticationPage from "./pages/KioskAuthenticationPage.jsx";
import KitchenPage from "./pages/KitchenPage.jsx";

import { Routes, Route } from 'react-router-dom';
import MenuProvider from "./context/MenuContext.jsx";
import CartProvider from "./context/CartContext.jsx";
import TableNumberProvider from './context/TableNumberContext.jsx';
import WaiterPage from "./pages/WaiterPage.jsx";

const App = () => {
    return (
        <>
            <Routes>
                <Route path='/kiosk' element={<KioskPage />} />
                <Route path='/login' element={<LogInPage />} />
                <Route path='kiosk/authentication' element={<KioskAuthenticationPage />} />
                <Route path='/menu' element={
                     <TableNumberProvider>
                        <MenuProvider>
                            <CartProvider>
                                <CustomerPage display={'menu'}/>
                            </CartProvider>
                        </MenuProvider>
                    </TableNumberProvider>
                } />

                <Route path='/menu/:id' element={
                    <TableNumberProvider>
                        <MenuProvider>
                            <CartProvider>
                                <CustomerPage display={'item'}/>
                            </CartProvider>
                        </MenuProvider>
                    </TableNumberProvider>
                } />
                <Route path='/kitchen' element={<KitchenPage />} />
                <Route path='/waiter' element={<WaiterPage />} />
            </Routes>
        </>
    );
};

export default App;
