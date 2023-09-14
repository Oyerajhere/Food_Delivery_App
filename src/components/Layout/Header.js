import { Fragment } from 'react'


import mealsImage from '../images/flat-lay-arrangement-with-salad-box-sauce.jpg'
import classes from './Header.module.css'
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
    return <Fragment>
        <header className={classes.header}>
            <div className={classes.logoBlock}>
                <div className={classes.logo}></div>
                <div className={classes.name}><h1>OrderKaro</h1></div>
            </div>
            <HeaderCartButton onClick={props.onShowCart} />
        </header>
        <div className={classes['main-image']}>
            <img src={mealsImage} alt='A table full of delicious food!' />
        </div>
    </Fragment>
};

export default Header;