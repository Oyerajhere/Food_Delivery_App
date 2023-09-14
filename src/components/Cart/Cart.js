import { useContext, useState } from 'react';

import Modal from '../UI/modal'
import CartItem from './CartItem';
import classes from './Cart.module.css'
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart = (props) => {
    const cartCtx = useContext(CartContext);

    const [checkOut, setCheckOut] = useState(false);

    const totalAmount = `₹${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = item => {
        cartCtx.addItem({ ...item, amount: 1 });
    };

    const orderHandler = () => {
        setCheckOut(true);
    };

    const modalAction = (
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>
                Close
            </button>
            {hasItems && <button className={classes.button} onClick={orderHandler} >
                Order
            </button>}
        </div>
    );

    const cartitems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
        </ul>
    );
    return (
        <Modal onClose={props.onClose}>
            {cartitems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {checkOut && < Checkout onCancel={props.onClose} />}
            {!checkOut && modalAction}
        </Modal>
    );
};

export default Cart;