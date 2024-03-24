import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const AddCartItemContext = createContext();
const RemoveCartItemContext = createContext();
const UpdateCartItemContext = createContext();
const CartContext = createContext();

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

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addCartItem = (item) => {
        setCart([...cart, item]);
        console.log(cart)
    };

    const removeCartItem = (name) => {
        const newCart = cart.filter((cartItem) => cartItem.name !== name);
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
        <AddCartItemContext.Provider value={addCartItem}>
            <RemoveCartItemContext.Provider value={removeCartItem}>
                <UpdateCartItemContext.Provider value={updateCartItem}>
                    <CartContext.Provider value={cart}>
                        {children}
                    </CartContext.Provider>
                </UpdateCartItemContext.Provider>
            </RemoveCartItemContext.Provider>
        </AddCartItemContext.Provider>
    );
}

CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default CartProvider;
export { useAddCartItem, useRemoveCartItem, useUpdateCartItem, useCart };