import SideBar from '../components/SideBar.jsx';
import TopBar from '../components/TopBar.jsx';
import BottomBar from '../components/BottomBar.jsx';
import './CustomerPage.css';
import PropTypes from "prop-types";
import Menu from "../components/Menu.jsx";
import Item from "../components/Item.jsx";
import CartProvider from "../context/CartContext.jsx";
import PastOrdersProvider from "../context/PastOrdersContext.jsx";
import MenuProvider from "../context/MenuContext.jsx";

const CustomerPage = (props) => {
    const { display } = props;
    return (
        <MenuProvider>
            <CartProvider>
                <PastOrdersProvider>
                    <div className='topbar-container'>
                        <TopBar />
                    </div>
                    <div className='sidebar-container'>
                        <SideBar />
                    </div>
                    <div className='bottombar-container'>
                        <BottomBar />
                    </div>
                    <div className='main-content-container'>
                        {display === 'menu' && <Menu />}
                        {display === 'item' && <Item />}
                    </div>
                </PastOrdersProvider>
            </CartProvider>
        </MenuProvider>
    );
};

CustomerPage.propTypes = {
    display: PropTypes.string.isRequired,
};

export default CustomerPage;