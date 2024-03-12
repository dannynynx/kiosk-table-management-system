import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const MenuContext = createContext();
const addMenuItemContext = createContext();
const filterMenuItemsContext = createContext();

const useMenu = () => {
    return useContext(MenuContext);
}

const useAddMenuItem = () => {
    return useContext(addMenuItemContext);
}

const useFilterMenuItems = () => { 
    return useContext(filterMenuItemsContext);
}

const MenuProvider = ({ children }) => {
    const [menu, setMenu] = useState([

    ]);

    const addMenuItem = (item) => {
        setMenu(prevMenu => {
            const updatedMenu = [...prevMenu, item];
            console.log(updatedMenu);
            return updatedMenu;
        });
    };


    const filterMenu = (category) => { 
        menu.some(item => item.category === category)
    };

    return (
        <MenuContext.Provider value={menu}>
            <filterMenuItemsContext value={filterMenu}>
                <addMenuItemContext.Provider value={addMenuItem}>
                    {children}
                </addMenuItemContext.Provider>
            </filterMenuItemsContext>
        </MenuContext.Provider>
    );
}

MenuProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MenuProvider;
export { useMenu, useAddMenuItem, useFilterMenuItems };