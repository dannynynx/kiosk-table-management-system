import SideBar from '../components/SideBar.jsx';
import TopBar from '../components/TopBar.jsx';
import BottomBar from '../components/BottomBar.jsx';
import './CustomerPage.css';
import PropTypes from "prop-types";
import Menu from "../components/Menu.jsx";
import Item from "../components/Item.jsx";

const CustomerPage = (props) => {
    const { display } = props;
    return (
        <>
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
        </>
    );
};

CustomerPage.propTypes = {
    display: PropTypes.string.isRequired,
};

export default CustomerPage;