import './App.css'
import CustomerPage from './pages/CustomerPage.jsx';
import LogInPage from "./pages/LogInPage.jsx";
import KioskPage from "./pages/KioskPage.jsx";
import KioskAuthenticationPage from "./pages/KioskAuthenticationPage.jsx";
import KitchenPage from "./pages/KitchenPage.jsx";
import TableSelection from "./pages/TableSelectionPage.jsx";

import { Routes, Route } from 'react-router-dom';
import MenuProvider from "./context/MenuContext.jsx";
import CartProvider from "./context/CartContext.jsx";
import TableProvider from "./context/TableContext.jsx";
import WaiterPage from "./pages/WaiterPage.jsx";
import ManagerPage from './pages/ManagerPage.jsx';
import axios from 'axios';


const App = () => {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    
    return (
        <>
            <Routes>
                <Route path='/kiosk' element={<KioskPage />} />
                <Route path='/kiosk/table-selection' element={<TableSelection/>} />
                <Route path='/login' element={
                    <TableProvider>
                         <LogInPage />    
                    </TableProvider>
                } />
                <Route path='kiosk/authentication' element={
                    <TableProvider>
                        <KioskAuthenticationPage />
                    </TableProvider>
                } />
                <Route path='/menu' element={
                    <TableProvider>
                        <MenuProvider>
                            <CartProvider>
                                <CustomerPage display={'menu'}/>
                            </CartProvider>
                        </MenuProvider>
                    </TableProvider>
                } />

                <Route path='/menu/:id' element={
                    <MenuProvider>
                        <CartProvider>
                            <CustomerPage display={'item'}/>
                        </CartProvider>
                    </MenuProvider>
                } />
                <Route path='/kitchen' element={
                        <KitchenPage />
                  } />
                <Route path='/waiter' element={<WaiterPage />} />
                <Route path='/manager' element={<ManagerPage />} />
            </Routes>
        </>
    );
};

export default App;
