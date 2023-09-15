import { useRef, useState} from 'react';

import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isSixChars = value => value.trim().length === 6;
const isTenChars = value => value.trim().length === 10;

const Checkout = (props) => {
    const [formInputIsValidity, setFormInputIsValidity] = useState({
        name: true,
        address: true,
        mobile: true,
        postalCode: true
    });

    const nameInputRef = useRef();
    const addressInputRef = useRef();
    const mobileInputRef = useRef();
    const postalInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredAddress = addressInputRef.current.value;
        const enteredMobile = mobileInputRef.current.value;
        const enteredpostal = postalInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredAddressIsValid = !isEmpty(enteredAddress);
        const enteredMobileIsValid = isTenChars(enteredMobile);
        const enteredPostalIsValid = isSixChars(enteredpostal);

        setFormInputIsValidity({
            name: enteredNameIsValid,
            address: enteredAddressIsValid,
            mobile: enteredMobileIsValid,
            postalCode: enteredPostalIsValid
        });

        const formIsValid = 
            enteredNameIsValid &&
            enteredAddressIsValid &&
            enteredMobileIsValid &&
            enteredPostalIsValid;

        if (!formIsValid){
            return;
        }

        //submit the form
        props.onConfirm({
            name: enteredName,
            address: enteredAddress,
            mobile: enteredMobile,
            postalCode: enteredpostal
        });
    };

    const nameControlClasses = `${classes.control} ${formInputIsValidity.name ? '' : classes.invalid}`;
    const addressControlClasses = `${classes.control} ${formInputIsValidity.address ? '' : classes.invalid}`;
    const molibeControlClasses = `${classes.control} ${formInputIsValidity.mobile ? '' : classes.invalid}`;
    const postalCodeControlClasses = `${classes.control} ${formInputIsValidity.postalCode ? '' : classes.invalid}`;

    return (
    
       <form className={classes.form} onSubmit={confirmHandler}>
        <div className={classes.deliveryInfo}>
            <h4>"🍕 One last step to the Delight! " </h4>
        </div>
        <div className={nameControlClasses}>
            <label htmlFor='name'>Your Name</label>
            <input type='text' id='name' ref={nameInputRef} />
            {!formInputIsValidity.name && <p>Please enter a valid name!</p>}
            
        </div>
        <div className={addressControlClasses}>
            <label htmlFor='address'>Address</label>
            <input type='text' id='address' ref={addressInputRef} />
            {!formInputIsValidity.address && <p>Please enter a valid address!</p>}
        </div>
        <div className={molibeControlClasses}>
            <label htmlFor='mobile'>Mobile</label>
            <input type='text' id='mobile' ref={mobileInputRef}/>
            {!formInputIsValidity.mobile && <p>Please enter a valid mobile!(10-digit)</p>}
        </div>
        <div className={postalCodeControlClasses}>
            <label htmlFor='postal'>Postal Code</label>
            <input type='text' id='postal' ref={postalInputRef} />
            {!formInputIsValidity.postalCode && <p>Please enter a valid postal code!(6-digit)</p>}
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

