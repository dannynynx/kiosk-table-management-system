import './SideBar.css';
import cart from '../assets/cart-icon.svg';
import orderList from '../assets/list-icon.svg';

const SideBar = () => {

    return (
        <>
            <div className='sidebar-icon-container'>
                <img src={cart} className='cart' alt='Cart Icon'/>
            </div>
            <div className='sidebar-icon-container'>
                <img src={orderList} className='order-list' alt='Order List Icon'/>
            </div>

        </>
    );
};

export default SideBar;