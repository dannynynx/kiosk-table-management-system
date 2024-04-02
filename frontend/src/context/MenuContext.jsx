import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const MenuContext = createContext(undefined);
const InitialiseMenuContext = createContext(undefined)
const AddMenuItemContext = createContext(undefined);

const useMenu = () => {
    return useContext(MenuContext);
}

const useInitialiseMenu = () => {
    return useContext(InitialiseMenuContext);
}

const useAddMenuItem = () => {
    return useContext(AddMenuItemContext);
}

const MenuProvider = ({ children }) => {
    const [menu, setMenu] = useState([]);
    const addMenuItem = (item) => {
        if (!menu.some(existingItem => existingItem === item)) {
            setMenu([...menu, item]);
        }
    };

    return (
        <MenuContext.Provider value={menu}>
            <InitialiseMenuContext.Provider value={setMenu}>
                <AddMenuItemContext.Provider value={addMenuItem}>
                    {children}
                </AddMenuItemContext.Provider>
            </InitialiseMenuContext.Provider>
        </MenuContext.Provider>
    );
}

MenuProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MenuProvider;
export { useMenu, useInitialiseMenu, useAddMenuItem };
