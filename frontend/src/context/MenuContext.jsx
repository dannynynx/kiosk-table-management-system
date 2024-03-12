import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const MenuContext = createContext();
const addMenuItemContext = createContext();

const useMenu = () => {
    return useContext(MenuContext);
}

const useAddMenuItem = () => {
    return useContext(addMenuItemContext);
}

const MenuProvider = ({ children }) => {
    const [menu, setMenu] = useState([
        { name: 'food', description: 'mm..food', category: 'good food', price: 9.99 },
        { name: 'food2', description: 'mm..food', category: 'good food', price: 19.99 },
        { name: 'food3', description: 'mm..food', category: 'good food', price: 29.99 },
        { name: 'food4', description: 'mm..food', category: 'good food', price: 39.99 },
        { name: 'food5', description: 'mm..food', category: 'good food', price: 49.99 },
        { name: 'food6', description: 'mm..food', category: 'good food', price: 59.99 },
        { name: 'food7', description: 'mm..food', category: 'good food', price: 69.99 },
        { name: 'food8', description: 'mm..food', category: 'good food', price: 79.99 },
        { name: 'food9', description: 'mm..food', category: 'good food', price: 89.99 },
        { name: 'food10', description: 'mm..food', category: 'good food', price: 99.99 },
        { name: 'food11', description: 'mm..food', category: 'good food', price: 109.99 },
    ]);

    const addMenuItem = (item) => {
        setMenu([...menu, item]);
    };

    return (
        <MenuContext.Provider value={menu}>
            <addMenuItemContext.Provider value={addMenuItem}>
                {children}
            </addMenuItemContext.Provider>
        </MenuContext.Provider>
    );
}

MenuProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MenuProvider;
export { useMenu, useAddMenuItem };