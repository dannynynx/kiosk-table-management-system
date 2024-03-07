import MainContent from '../components/MainContent.jsx';
import SideBar from '../components/SideBar.jsx';
import TopBar from '../components/TopBar.jsx';
import BottomBar from '../components/BottomBar.jsx'

const Menu = () => {
    return (
        <>   
            <div id='topbar-container'>
                <TopBar />
            </div>
            <div id='sidebar-container'>
                <SideBar />
            </div>
            <div id='bottombar-container'>
                <BottomBar />
            </div>
            <div id='main-content-container'>
                <MainContent />
            </div>
        </>
    );
};

export default Menu;