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
import WaiterPage from "./pages/WaiterPage.jsx";
import ManagerPage from './pages/ManagerPage.jsx';
import ManagerMenuPage from './pages/ManagerMenuPage.jsx';
import AccountManagePage from './pages/AccountManagePage.jsx';
import axios from 'axios';


const App = () => {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    
    return (
        <>
            <Routes>
                <Route path='/kiosk' element={<KioskPage />} />
                <Route path='/kiosk/table-selection' element={<TableSelection/>} />
                <Route path='/login' element={<LogInPage />} />
                <Route path='kiosk/authentication' element={<KioskAuthenticationPage />} />
                <Route path='/menu' element={
                    <MenuProvider>
                        <CartProvider>
                            <CustomerPage display={'menu'}/>
                        </CartProvider>
                    </MenuProvider>
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
                <Route path='/manager/menu' element={
                    <MenuProvider>
                        <ManagerMenuPage display={'menu'}/>
                    </MenuProvider>
                } />
                <Route path='/manager/menu/:id' element={
                    <MenuProvider>
                        <ManagerMenuPage display={'item'}/>
                    </MenuProvider>
                } />

                <Route path='/manager/menu/add' element={
                    <MenuProvider>
                        <ManagerMenuPage display={'add'}/>
                    </MenuProvider>
                }/>
                <Route path='/manager/stats' element={<ManagerPage />} />
                <Route path='/manager/accounts' element={<AccountManagePage/>}/>
            </Routes>
        </>
    );
};

export default App;
