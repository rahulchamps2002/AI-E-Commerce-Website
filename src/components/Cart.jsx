import { useContext } from 'react';
import { CartContext } from '../context/CartContext.jsx';

const Cart = () => {
    const { cartItems, removeFromCart, totalPrice } = useContext(CartContext);

    return (
        <div>
            <h2>Your Cart</h2>
            {cartItems.map((item) => (
                <div key={item._id}>
                    <h4>{item.name}</h4>
                    <p>{item.quantity} x ${item.price}</p>
                    <button onClick={() => removeFromCart(item._id)}>Remove</button>
                </div>
            ))}
            <h3>Total: ${totalPrice}</h3>
            <button>Checkout</button>
        </div>
    );
};

export default Cart;
