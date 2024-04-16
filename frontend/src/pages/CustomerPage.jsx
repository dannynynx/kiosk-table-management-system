import SideBar from '../components/SideBar.jsx';
import TopBar from '../components/TopBar.jsx';
import './CustomerPage.css';
import PropTypes from "prop-types";
import Menu from "../components/Menu.jsx";
import Item from "../components/Item.jsx";
import { useInitialiseMenu } from "../context/MenuContext.jsx";
import { useInitialiseTopBar } from "../context/TopBarContext.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const CustomerPage = (props) => {
    const initialiseMenuItem = useInitialiseMenu();
    const initialiseTopBar = useInitialiseTopBar();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        if (!localStorage.getItem('token')) { 
            navigate('/login');
        } 
        axios.get('http://127.0.0.1:5000/customer/showMenu')
        .then(response => {
            const data = response.data;
            initialiseMenuItem(data);
        })
        .catch(error => {
            console.error('Error fetching menu:', error);
        });
        initialiseTopBar(
                        {
                            "tablenumber" :localStorage.getItem('tablenumber'), 
                            "token": localStorage.getItem('token')
                        }
                        );
    }, [initialiseMenuItem, initialiseTopBar]);

    const handleCategoryFilter = (category) => {
        setSelectedCategory(category);
    };

    const handleSearchFilter = (searchValue) => {
        setSearchValue(searchValue);
    }

    const { display } = props;
    return (
        <>
            <div className='topbar-container'>
                <TopBar onHandleSearchFilter={handleSearchFilter}/>
            </div>
            <div className='sidebar-container'>
                <SideBar onCategorySelect={handleCategoryFilter}/>
            </div>
            <div className='main-content-container'>
                {display === 'menu' && <Menu selectedCategory={selectedCategory} searchValue={searchValue}/>}
                {display === 'item' && <Item />}
            </div>
        </>
    );
};

CustomerPage.propTypes = {
    display: PropTypes.string.isRequired,
};

export default CustomerPage;