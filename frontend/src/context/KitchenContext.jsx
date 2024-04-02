import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";


const InitialiseKitchenOrdersContext = createContext();
const KitchenOrderContext = createContext();


const useKitchenOrders = () => {
    return useContext(KitchenOrderContext);
}


const useIntialiseKitchenOrders = () => { 
    return useContext(InitialiseKitchenOrdersContext);
}


const KitchenOrdersProvider = ({ children }) => {
    const [kitchenOrders, setKitchenOrder] = useState([]);

    return (

    <KitchenOrderContext.Provider value={kitchenOrders}>
        <InitialiseKitchenOrdersContext.Provider value={setKitchenOrder}>
            {/* <RemoveKitchenOrderContext.Provider value={removeKitchenOrder}> */}
                        {children}
            {/* </RemoveKitchenOrderContext.Provider> */}
        </InitialiseKitchenOrdersContext.Provider>
    </KitchenOrderContext.Provider>
    );
}

KitchenOrderContext.propTypes = {
    children: PropTypes.node.isRequired,
};

export default KitchenOrdersProvider;
export { useIntialiseKitchenOrders, useKitchenOrders };