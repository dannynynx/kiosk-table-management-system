import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";


const InitialiseKitchenOrdersContext = createContext();
const RemoveKitchenOrderContext = createContext();
const KitchenOrderContext = createContext();


const useKitchenOrders = () => {
    return useContext(KitchenOrderContext);
}


const useIntialiseKitchenOrders = () => { 
    return useContext(InitialiseKitchenOrdersContext);
}

const useRemoveKitchenOrder = () => {
    return useContext(RemoveKitchenOrderContext);
}

const KitchenOrdersProvider = ({ children }) => {
    const [kitchenOrders, setKitchenOrder] = useState([]);

    const removeKitchenOrder = (name) => {
        // const newOrder = kitchenOrder.filter((cartItem) => cartItem.name !== name);
        // setCart(newCart);
        // console.log(cart)
    };

   

    return (

    <KitchenOrderContext.Provider>
        <InitialiseKitchenOrdersContext.Provider value={setKitchenOrder}>
            <RemoveKitchenOrderContext.Provider value={removeKitchenOrder}>
                    <KitchenOrderContext.Provider value={kitchenOrders}>
                        {children}
                    </KitchenOrderContext.Provider>
            </RemoveKitchenOrderContext.Provider>
        </InitialiseKitchenOrdersContext.Provider>
    </KitchenOrderContext.Provider>
    );
}

KitchenOrderContext.propTypes = {
    children: PropTypes.node.isRequired,
};

export default KitchenOrdersProvider;
export { useIntialiseKitchenOrders, useRemoveKitchenOrder, useKitchenOrders };