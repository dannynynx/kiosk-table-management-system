import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const AddCartItemContext = createContext();
const RemoveCartItemContext = createContext();
const UpdateCartItemContext = createContext();
const CartContext = createContext();
const initialiseCartContext = createContext();

const useAddCartItem = () => {
    return useContext(AddCartItemContext);
}

const useRemoveCartItem = () => {
    return useContext(RemoveCartItemContext);
}

const useUpdateCartItem = () => {
    return useContext(UpdateCartItemContext);
}

const useCart = () => {
    return useContext(CartContext);
}

const useInitialiseCart = () => {
    return useContext(initialiseCartContext);
}

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addCartItem = (id, qty) => {
        console.log(id, qty, cart);
        const item = { "id": id, "qty": qty };
        setCart([...cart, item]);
    };

    const removeCartItem = (id) => {
        const newCart = cart.filter((cartItem) => cartItem.id !== id);
        setCart(newCart);
    };

    const updateCartItem = (id, qty) => {
        console.log(id, qty, cart);
        const newCart = cart.map((cartItem) => {
            if (cartItem.id === id) {
                return { ...cartItem, qty};
            }
            return cartItem;
        });
        setCart(newCart);
    }

    return (
        <AddCartItemContext.Provider value={addCartItem}>
            <RemoveCartItemContext.Provider value={removeCartItem}>
                <UpdateCartItemContext.Provider value={updateCartItem}>
                    <initialiseCartContext.Provider value={setCart}>
                        <CartContext.Provider value={cart}>
                            {children}
                        </CartContext.Provider>
                    </initialiseCartContext.Provider>
                </UpdateCartItemContext.Provider>
            </RemoveCartItemContext.Provider>
        </AddCartItemContext.Provider>
    );
}

CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default CartProvider;
export { useAddCartItem, useRemoveCartItem, useUpdateCartItem, useCart, useInitialiseCart };