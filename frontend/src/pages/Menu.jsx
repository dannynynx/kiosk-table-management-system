import MainContent from '../components/MainContent.jsx';
import SideBar from '../components/SideBar.jsx';
import TopBar from '../components/TopBar.jsx';
import BottomBar from '../components/BottomBar.jsx';
import './Menu.css';

const Menu = () => {
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
                <MainContent />
            </div>
        </>
    );
};

export default Menu;