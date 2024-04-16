import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const TopBarContext = createContext(undefined);
const InitialiseTopBarContext = createContext(undefined)

const useTopBar = () => {
    return useContext(TopBarContext);
}

const useInitialiseTopBar = () => {
    return useContext(InitialiseTopBarContext);
}

const TopBarProvider = ({ children }) => {
    const [topBar, setTopBar] = useState(null);
    return (
        <TopBarContext.Provider value={topBar}>
            <InitialiseTopBarContext.Provider value={setTopBar}>
                { children }
            </InitialiseTopBarContext.Provider>
        </TopBarContext.Provider>
    );
}

TopBarProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default TopBarProvider;
export { useTopBar, useInitialiseTopBar };
