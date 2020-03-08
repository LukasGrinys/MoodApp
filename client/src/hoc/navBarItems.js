import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
// import { connect } from 'react-redux';

import styles from './css/header.module.css';

const NavBarItems = (props) => {
    const items = [
        {
            iconName: "home",
            path: "/",
            text: "Home",
            isAuth: null
        },
        {
            iconName: "sign-in",
            path: "/login",
            text: "Log In",
            isAuth: false
        },
        {
            iconName: "sign-out",
            path: "/logout",
            text: "Log Out",
            isAuth: true
        },
        {
            iconName: "user-plus",
            path: "/register",
            text: "Sign Up",
            isAuth: null
        },
        {
            iconName: "book",
            path: "/dashboard",
            text: "Your Dashboard",
            isAuth: true
        }
    ];
    const itemElement = (item, i) => (
        <Link to={item.path} key={i}>
            <div className={styles.navItem} onClick={props.closeNav}>
                <FontAwesome name={item.iconName}/> {item.text}
            </div> 
        </Link>
    )

    const showItems = () => (
        
            items.map( (item, i) => {
                if (props.isAuth === true && item.isAuth) {
                    return itemElement(item,i)     
                } else if (props.isAuth === false && !item.isAuth) {
                    return itemElement(item,i) 
                } else if (item.isAuth === null) {
                    return itemElement(item,i)
                }
                return null
            })
        
    )

    return (
        <div>
            {showItems()}
        </div>
    );
};

// function mapStateToProps(state) {
//     return {
//         user: state.user
//     }
// }
export default NavBarItems

// export default connect(mapStateToProps)(NavBarItems);