import React, { useContext, useState} from 'react';

import Modal from '../UI/modal'
import CartItem from './CartItem';
import classes from './Cart.module.css'
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart = (props) => {
    const [checkOut, setCheckOut] = useState(false);
    const [Submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const cartCtx = useContext(CartContext);

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

    const submitOderHandler = async (userData) => {
        setSubmitting(true);
        await fetch('https://food-delivery-app-d6281-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });
        setSubmitting(false);
        setSubmitted(true);
        cartCtx.clearCart();
    };

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

    const cartModalContent = (
        <React.Fragment>
            {cartitems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {checkOut && < Checkout onConfirm={submitOderHandler} onCancel={props.onClose} />}
            {!checkOut && modalAction}
        </React.Fragment>
        );

        const submittingModalContent = <h3>Placing your order...</h3>;

        const submittedModalContent = 
            <React.Fragment>
                <h3>Order placed successfully!! ✅</h3>
                <div className={classes.actions}>
            <button className={classes.button} onClick={props.onClose}>
                Close
            </button>
        </div>
            </React.Fragment>
    return (
        <Modal onClose={props.onClose}>
            {!Submitting && !submitted && cartModalContent}
            {Submitting && submittingModalContent}
            {!Submitting && submitted && submittedModalContent}
        </Modal>
    );
};

export default Cart;