import ItemPreview from './ItemPreview.jsx';
import './ManagerMenu.css';
import { Link, useNavigate } from "react-router-dom";
import { useMenu } from "../context/MenuContext.jsx";
import PropTypes from "prop-types";
import add from "../assets/plus-icon.svg"

const ManagerMenu = ({ selectedCategory, searchValue }) => {
    const processLink = (str) => str.toLowerCase().replace(/\s/g, '-');
    const getMenu = useMenu();
    const navigate = useNavigate();
    const filteredItems = getMenu.filter(item =>
        (!selectedCategory || item.category === selectedCategory) &&
        (!searchValue || item.name.toLowerCase().includes(searchValue.toLowerCase()))
    );

    const handleAddItem = () => { 
        navigate("/manager/menu/add");
    }


    return (
        <div className='menu'>
            <div className='item-preview' onClick={handleAddItem}>
                <img src={add} className='item-preview-image' alt="add food" />
                <div className='item-preview-contents'>
                    <div className='item-preview-name'>Add an item</div>
                </div>
            </div>
            {filteredItems.map(item => <Link className='item-link' to= {{
                    pathname: `${processLink(item.name)}`, search: `?param=${item.id}`}}
                key={item.id}><ItemPreview id={item.id}/></Link> )}
        </div>
        
    );
};

ManagerMenu.propTypes = {
    selectedCategory: PropTypes.string,
    searchValue: PropTypes.string,
};

export default ManagerMenu;