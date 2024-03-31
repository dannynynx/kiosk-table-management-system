import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const MenuContext = createContext();
const InitialiseMenuContext = createContext()
const AddMenuItemContext = createContext();
const FilterMenuItemsContext = createContext();
const PastMenuContext = createContext();
const InitialisePastMenuContext = createContext();

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

const usePastMenu = () => { 
    return useContext(PastMenuContext);
}

const useInitialisePastMenu = () => { 
    return useContext(InitialisePastMenuContext);
}

const MenuProvider = ({ children }) => {
    const [menu, setMenu] = useState([]);
    const [pastmenu, setPastMenu] = useState([]);
    const addMenuItem = (item) => {
        if (!menu.some(existingItem => existingItem === item)) {
            setMenu([...menu, item]);
        }
    };


    const filterMenu = (category) => { 
        const filteredItems = menu.filter(item => item.category === category);
        console.log(filteredItems);
        return filteredItems;
    }

    return (
        <MenuContext.Provider value={menu}>
            <PastMenuContext.Provider value={pastmenu}>
                <InitialisePastMenuContext.Provider value={setPastMenu}>
                    <InitialiseMenuContext.Provider value={setMenu}>
                        <FilterMenuItemsContext.Provider value={filterMenu}>
                            <AddMenuItemContext.Provider value={addMenuItem}>
                                {children}
                            </AddMenuItemContext.Provider>
                        </FilterMenuItemsContext.Provider>
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
export { useMenu, useInitialiseMenu, useAddMenuItem, useFilterMenuItems, usePastMenu, useInitialisePastMenu};
