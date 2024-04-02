import ItemPreview from './ItemPreview.jsx';
import './Menu.css';
import { Link } from "react-router-dom";
import { useMenu } from "../context/MenuContext.jsx";
import PropTypes from "prop-types";

const Menu = ({ selectedCategory, searchValue }) => {
    const processLink = (str) => str.toLowerCase().replace(/\s/g, '-');
    const getMenu = useMenu();
    const filteredItems = getMenu.filter(item =>
        (!selectedCategory || item.category === selectedCategory) &&
        (!searchValue || item.name.toLowerCase().includes(searchValue.toLowerCase()))
    );

    return (
        <div className='menu'>
            {filteredItems.map(item => <Link className='item-link' to= {{
                    pathname: `${processLink(item.name)}`, search: `?param=${item.id}`}}
                key={item.id}><ItemPreview id={item.id}/></Link> )}
        </div>
    );
};

Menu.propTypes = {
    selectedCategory: PropTypes.string,
    searchValue: PropTypes.string,
};

export default Menu;