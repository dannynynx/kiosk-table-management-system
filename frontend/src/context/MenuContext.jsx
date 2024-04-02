import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const MenuContext = createContext(undefined);
const InitialiseMenuContext = createContext(undefined)
const AddMenuItemContext = createContext(undefined);
const PastMenuContext = createContext(undefined);
const InitialisePastMenuContext = createContext(undefined);

const useMenu = () => {
    return useContext(MenuContext);
}

const useInitialiseMenu = () => {
    return useContext(InitialiseMenuContext);
}

const useAddMenuItem = () => {
    return useContext(AddMenuItemContext);
}

const usePastMenu = () => { 
    return useContext(PastMenuContext);
}

const useInitialisePastMenu = () => { 
    return useContext(InitialisePastMenuContext);
}

const MenuProvider = ({ children }) => {
    const [menu, setMenu] = useState([]);
    const [pastMenu, setPastMenu] = useState([]);
    const addMenuItem = (item) => {
        if (!menu.some(existingItem => existingItem === item)) {
            setMenu([...menu, item]);
        }
    };

    return (
        <MenuContext.Provider value={menu}>
            <PastMenuContext.Provider value={pastMenu}>
                <InitialisePastMenuContext.Provider value={setPastMenu}>
                    <InitialiseMenuContext.Provider value={setMenu}>
                        <AddMenuItemContext.Provider value={addMenuItem}>
                            {children}
                        </AddMenuItemContext.Provider>
                    </InitialiseMenuContext.Provider>
                </InitialisePastMenuContext.Provider>
            </PastMenuContext.Provider>
        </MenuContext.Provider>
    );
}

MenuProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MenuProvider;
export { useMenu, useInitialiseMenu, useAddMenuItem, usePastMenu, useInitialisePastMenu};
