import PropTypes from 'prop-types';
import { createContext, useReducer, useContext } from 'react';

const initialState = {
    cartItems: [],
    totalPrice: 0,
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const existingItem = state.cartItems.find(item => item._id === action.payload._id);
            if (existingItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(item =>
                        item._id === action.payload._id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                    totalPrice: state.totalPrice + action.payload.price,
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
                    totalPrice: state.totalPrice + action.payload.price,
                };
            }
        }
        case 'REMOVE_FROM_CART': {
            const filteredItems = state.cartItems.filter(item => item._id !== action.payload);
            const itemToRemove = state.cartItems.find(item => item._id === action.payload);
            return {
                ...state,
                cartItems: filteredItems,
                totalPrice: state.totalPrice - (itemToRemove.price * itemToRemove.quantity),
            };
        }
        default:
            return state;
    }
};

// Create context
const CartContext = createContext();

// Provider component to wrap the app
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const addToCart = (item) => {
        dispatch({ type: 'ADD_TO_CART', payload: item });
    };

    const removeFromCart = (id) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    };

    return (
        <CartContext.Provider value={{ ...state, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

// PropTypes validation
CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Hook to use the CartContext in components
export const useCart = () => {
    return useContext(CartContext);
};
