import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const RemoveKitchenOrderContext = createContext();
const UpdateKitchenOrderContext = createContext();
const KitchenOrderContext = createContext();


const useRemoveKitchenOrder = () => {
    return useContext(RemoveKitchenOrderContext);
}

const useUpdateKitchenOrder = () => {
    return useContext(UpdateKitchenOrderContext);
}

const useKitchenOrders = () => {
    return useContext(KitchenOrderContext);
}

const KitchenOrdersProvider = ({ children }) => {
    const [kitchenOrders, setKitchenOrder] = useState([]);

    const removeKitchenOrder = (name) => {
        const newOrder = kitchenOrder.filter((cartItem) => cartItem.name !== name);
        setCart(newCart);
        console.log(cart)
    };

    const updateCartItem = (name, qty) => {
        const newCart = cart.map((cartItem) => {
            if (cartItem.name === name) {
                return { ...cartItem, qty: qty };
            }
            return cartItem;
        });
        setCart(newCart);
    }

    return (
    
        <RemoveCartItemContext.Provider value={removeCartItem}>
            <UpdateCartItemContext.Provider value={updateCartItem}>
                <CartContext.Provider value={cart}>
                    {children}
                </CartContext.Provider>
            </UpdateCartItemContext.Provider>
        </RemoveCartItemContext.Provider>
    
    );
}

CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default CartProvider;
export { useAddCartItem, useRemoveCartItem, useUpdateCartItem, useCart };