import SideBar from '../components/SideBar.jsx';
import TopBar from '../components/TopBar.jsx';
import BottomBar from '../components/BottomBar.jsx';
import './CustomerPage.css';
import PropTypes from "prop-types";
import Menu from "../components/Menu.jsx";
import Item from "../components/Item.jsx";
import { useInitialiseMenu, useMenu } from "../context/MenuContext.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

const CustomerPage = (props) => {
    const initialiseMenuItem = useInitialiseMenu();
    const [selectedCategory, setSelectedCategory] = useState(null);

useEffect(() => {
    axios.get('http://127.0.0.1:5000/customer/showMenu')
        .then(response => {
            const data = response.data;
            console.log(data);
            initialiseMenuItem(data);
        })
        .catch(error => {
            console.error('Error fetching menu:', error);
        });
}, [initialiseMenuItem]);

    const handleCategoryFilter = (category) => {
        setSelectedCategory(category);
    };

    const { display } = props;
    return (
        <>
            <div className='topbar-container'>
                <TopBar onCategorySelect={handleCategoryFilter} />
            </div>
            <div className='sidebar-container'>
                <SideBar />
            </div>
            <div className='bottombar-container'>
                <BottomBar />
            </div>
            <div className='main-content-container'>
                {display === 'menu' && <Menu selectedCategory={selectedCategory} />}
                {display === 'item' && <Item />}
            </div>
        </>
    );
};

CustomerPage.propTypes = {
    display: PropTypes.string.isRequired,
};

export default CustomerPage;