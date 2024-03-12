import './SideBar.css';
import cart from '../assets/cart-icon.svg';
import orderList from '../assets/list-icon.svg';
import {useState} from "react";
import Cart from './Cart';
import PastOrders from './PastOrders';

const SideBar = () => {
    const [renderContent, setRenderContent] = useState(null);
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = (contentType) => {
        setRenderContent(expanded ? null : contentType);
        setExpanded(!expanded);
    };

    return (
        <>
            <div className='sidebar-icon-container' onClick={() => toggleExpand('cart')}>
                <img src={cart} className='cart' alt='Cart Icon'/>
            </div>
            <div className='sidebar-icon-container' onClick={() => toggleExpand('pastOrders')}>
                <img src={orderList} className='order-list' alt='Order List Icon'/>
            </div>
            <div className={`sidebar ${expanded ? 'expanded' : ''}`}>
                {renderContent === 'cart' && expanded && <Cart toggleExpand={toggleExpand}/>}
                {renderContent === 'pastOrders' && expanded && <PastOrders toggleExpand={toggleExpand}/>}
            </div>
        </>
    );
};

export default SideBar;