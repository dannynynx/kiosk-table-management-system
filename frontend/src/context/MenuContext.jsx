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
        { name: 'food1', price: 9.99, description: 'mm..food1', category: 'good food', ingredients: ['plate', 'spoon', 'fork'] },
        { name: 'food2', price: 19.99, description: 'mm..food2', category: 'good food', ingredients: ['plate', 'spoon', 'fork'] },
        { name: 'food3', price: 29.99, description: 'mm..food3', category: 'good food', ingredients: ['plate', 'spoon', 'fork'] },
        { name: 'food4', price: 39.99, description: 'mm..food4', category: 'good food', ingredients: ['plate', 'spoon', 'fork'] },
        { name: 'food5', price: 49.99, description: 'mm..food5', category: 'good food', ingredients: ['plate', 'spoon', 'fork'] },
        { name: 'food6', price: 59.99, description: 'mm..food6', category: 'good food', ingredients: ['plate', 'spoon', 'fork'] },
        { name: 'food7', price: 69.99, description: 'mm..food7', category: 'good food', ingredients: ['plate', 'spoon', 'fork'] },
        { name: 'food8', price: 79.99, description: 'mm..food8', category: 'good food', ingredients: ['plate', 'spoon', 'fork'] },
        { name: 'food9', price: 89.99, description: 'mm..food9', category: 'good food', ingredients: ['plate', 'spoon', 'fork'] },
        { name: 'food10', price: 99.99, description: 'mm..food10', category: 'good food', ingredients: ['plate', 'spoon', 'fork'] },
        { name: 'food11', price: 109.99, description: 'mm..food11', category: 'good food', ingredients: ['plate', 'spoon', 'fork'] },
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