import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const MenuContext = createContext();
const InitialiseMenuContext = createContext()
const AddMenuItemContext = createContext();
const FilterMenuItemsContext = createContext();

const useMenu = () => {
    return useContext(MenuContext);
}

const useInitialiseMenu = () => {
    return useContext(InitialiseMenuContext);
}

const useAddMenuItem = () => {
    return useContext(AddMenuItemContext);
}

const useFilterMenuItems = () => { 
    return useContext(FilterMenuItemsContext);
}

const MenuProvider = ({ children }) => {
    const [menu, setMenu] = useState([]);
    const [filteredMenu, setFilteredMenu] = useState([]);


    const initialiseMenu = (data) => {
        setMenu(data);
        setFilteredMenu(data); // Initially, set filtered menu to full menu
    };

    const addMenuItem = (item) => {
        if (!menu.some(existingItem => existingItem === item)) {
            setMenu([...menu, item]);
        }
    };


    const filterMenu = (category) => { 
        menu.some(item => item.category === category)
    };

    return (
        <MenuContext.Provider value={filteredMenu}>
            <InitialiseMenuContext.Provider value={initialiseMenu}>
                <FilterMenuItemsContext.Provider value={filterMenu}>
                    <AddMenuItemContext.Provider value={addMenuItem}>
                        {children}
                    </AddMenuItemContext.Provider>
                </FilterMenuItemsContext.Provider>
            </InitialiseMenuContext.Provider>
        </MenuContext.Provider>
    );
}

MenuProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MenuProvider;
export { useMenu, useInitialiseMenu, useAddMenuItem, useFilterMenuItems };
