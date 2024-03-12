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

    ]);

    const addMenuItem = (item) => {
        setMenu(prevMenu => {
            const updatedMenu = [...prevMenu, item];
            console.log(updatedMenu);
            return updatedMenu;
        });
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