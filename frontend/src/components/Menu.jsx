import ItemPreview from './ItemPreview.jsx';
import './Menu.css';
import { Link, useLocation } from "react-router-dom";
import { useMenu, useFilterMenuItems } from "../context/MenuContext.jsx";

const Menu = ({selectedCategory}) => {
    const processLink = (str) => str.toLowerCase().replace(/\s/g, '-');
    const location = useLocation();
    const filterMenu = useFilterMenuItems();
    const filteredItems = selectedCategory ? filterMenu(selectedCategory) : useMenu(); // Filtering menu items based on the selected category
const { state } = location;
    const tableNumber = state && state.tablenumber ? state.tablenumber : null; // Get table number from state, if available


    return (
        <div className='menu'>
            {filteredItems.map(item => <Link className='item-link' to= {{
                    pathname: `${processLink(item.name)}`,
                    state: { tablenumber: tableNumber } // Pass table number in state
                }} 
                key={item.name}><ItemPreview name={item.name} cost={item.price}/></Link> )}
        </div>
    );
};

export default Menu;