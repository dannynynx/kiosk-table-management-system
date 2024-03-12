import { createContext, useState } from "react";
import PropTypes from "prop-types";

const PastOrdersContext = createContext();

const PastOrdersProvider = ({ children }) => {
    const [pastOrders, setPastOrders] = useState([]);

    const addPastOrder = (order) => {
        setPastOrders([...pastOrders, order]);
    };

    return (
        <PastOrdersContext.Provider value={{ pastOrders, addPastOrder }}>
            {children}
        </PastOrdersContext.Provider>
    );
}

PastOrdersProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PastOrdersProvider;