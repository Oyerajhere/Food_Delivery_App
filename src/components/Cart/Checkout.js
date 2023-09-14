import classes from './Checkout.module.css';

const Checkout = (props) => {
    const confirmHandler = (event) => {
        event.preventDefault();
    };

    return (
    
       <form className={classes.form} onSubmit={confirmHandler}>
        <div className={classes.deliveryInfo}>
            <h4>"🍕 One last step to the Delight! " </h4>
        </div>
        <div className={classes.control}>
            <label htmlFor='name'>Your Name</label>
            <input type='text' id='name' />
        </div>
        <div className={classes.control}>
            <label htmlFor='address'>Address</label>
            <input type='text' id='address' />
        </div>
        <div className={classes.control}>
            <label htmlFor='mobile'>Mobile</label>
            <input type='text' id='mobile' />
        </div>
        <div className={classes.control}>
            <label htmlFor='postal'>Postal Code</label>
            <input type='text' id='postal' />
        </div>    
        
        <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
            Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
        </div>
       </form>
    );
}

export default Checkout;

