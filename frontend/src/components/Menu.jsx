import ItemPreview from './ItemPreview.jsx';
import './Menu.css';
import { Link } from "react-router-dom";

const Menu = () => {
    return (
        <div className='menu'>
            <Link className='item-link' to='Item1'><ItemPreview /></Link>
            <Link className='item-link' to='Item2'><ItemPreview /></Link>
            <Link className='item-link' to='Item3'><ItemPreview /></Link>
            <Link className='item-link' to='Item4'><ItemPreview /></Link>
            <Link className='item-link' to='Item5'><ItemPreview /></Link>
            <Link className='item-link' to='Item6'><ItemPreview /></Link>
            <Link className='item-link' to='Item7'><ItemPreview /></Link>
            <Link className='item-link' to='Item8'><ItemPreview /></Link>
            <Link className='item-link' to='Item9'><ItemPreview /></Link>
            <Link className='item-link' to='Item10'><ItemPreview /></Link>
            <Link className='item-link' to='Item11'><ItemPreview /></Link>
        </div>
    );
};

export default Menu;