import ItemPreview from './ItemPreview.jsx';
import './Menu.css';
import { Link, useLocation } from "react-router-dom";
import { useMenu, useFilterMenuItems } from "../context/MenuContext.jsx";

const Menu = ({selectedCategory}) => {
    const processLink = (str) => str.toLowerCase().replace(/\s/g, '-');
    const filterMenu = useFilterMenuItems();
    const filteredItems = selectedCategory ? filterMenu(selectedCategory) : useMenu(); // Filtering menu items based on the selected category

    return (
        <div className='menu'>
            {filteredItems.map((item, key) => <Link className='item-link' to= {{
                    pathname: `${processLink(item.name)}`,}} 
                key={key}><ItemPreview name={item.name} cost={item.price}/></Link> )}
        </div>
    );
};

export default Menu;