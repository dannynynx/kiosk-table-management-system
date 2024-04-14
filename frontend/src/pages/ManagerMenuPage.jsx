import ManagerSideBar from '../components/ManagerSideBar.jsx';
import ManagerTopBar from '../components/ManagerTopBar.jsx';
import './ManagerMenuPage.css';
import PropTypes from "prop-types";
import ManagerMenu from "../components/ManagerMenu.jsx";
import ItemEdit from "../components/ItemEdit.jsx";
import Item from "../components/Item.jsx"
import { useInitialiseMenu } from "../context/MenuContext.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Menu from "../components/Menu.jsx"
import ItemAdd from '../components/ItemAdd.jsx';


const ManagerMenuPage = (props) => {
    const initialiseMenuItem = useInitialiseMenu();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const [editMode, setEditMode] = useState(localStorage.getItem('edit') === true);

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
    }, [initialiseMenuItem]);

    const handleCategoryFilter = (category) => {
        setSelectedCategory(category);
    };

    const handleSearchFilter = (searchValue) => {
        setSearchValue(searchValue);
    }
    
    const handleEditModeToggle = () => {
        const newEditMode = !editMode;
        setEditMode(newEditMode);
        localStorage.setItem('edit', newEditMode);
    };
    

    const { display } = props;
    return (
        <>
            <div className='topbar-container'>
                <ManagerTopBar onHandleSearchFilter={handleSearchFilter}  editMode={editMode} onEditModeToggle={handleEditModeToggle}/>
            </div>
            <div className='sidebar-container'>
                <ManagerSideBar onCategorySelect={handleCategoryFilter} editMode={editMode} />
            </div>
            <div className='main-content-container'>
                {display === 'menu' && (editMode ? <ManagerMenu selectedCategory={selectedCategory} searchValue={searchValue}/> : <Menu selectedCategory={selectedCategory} searchValue={searchValue}/>)}
                {display === 'item' && editMode && <ItemEdit />}
                {display === 'item' && !editMode && <Item />}
                {display === 'add' && editMode && <ItemAdd />}
            </div>
        </>
    );
};

ManagerMenuPage.propTypes = {
    display: PropTypes.string.isRequired,
};

export default ManagerMenuPage;