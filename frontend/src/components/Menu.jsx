import ItemPreview from './ItemPreview.jsx';
import './Menu.css';
import { Link } from "react-router-dom";
import { useMenu } from "../context/MenuContext.jsx";

const Menu = () => {
    const getMenu = useMenu();
    const processLink = (str) => str.toLowerCase().replace(/\s/g, '-');

    return (
        <div className='menu'>
            {getMenu.map(item => <Link className='item-link' to={`${processLink(item.name)}`} key={item.name}><ItemPreview name={item.name} cost={item.price}/></Link> )}
        </div>
    );
};

export default Menu;