import ItemPreview from './ItemPreview.jsx';
import './Menu.css';
import { Link } from "react-router-dom";
import { useMenu, useFilterMenuItems } from "../context/MenuContext.jsx";

const Menu = ({selectedCategory}) => {
    const processLink = (str) => str.toLowerCase().replace(/\s/g, '-');
    const filterMenu = useFilterMenuItems();
    const filteredItems = selectedCategory ? filterMenu(selectedCategory) : useMenu(); // Filtering menu items based on the selected category


    return (
        <div className='menu'>
            {filteredItems.map(item => <Link className='item-link' to={`${processLink(item.name)}`} key={item.name}><ItemPreview name={item.name} cost={item.price}/></Link> )}
        </div>
    );
};

export default Menu;