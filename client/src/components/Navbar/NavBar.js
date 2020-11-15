import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.scss';
import { items } from './items';
import { useTheme } from '../../contexts/ThemeContext';
import FontAwesome from 'react-fontawesome';
import classNames from 'classnames';

const NavBar = ({isAuth, toggleNav}) => {
    const darkTheme = useTheme();

    const itemElement = (item, i) => (
        <Link to={item.path} key={i}>
            <div className={styles.navItem} onClick={toggleNav}>
                <FontAwesome name={item.iconName}/> {item.text}
            </div> 
        </Link>
    )

    const renderItems = (items) => {
        return (
            items.map( (item, i) => {
                if (isAuth && item.isAuth) {
                    return itemElement(item,i)     
                } else if (!isAuth && item.isAuth === false) {
                    return itemElement(item,i) 
                } else if (item.isAuth === null) {
                    return itemElement(item,i)
                }
                return null
            })
        )
    }

    return (
        <div>
            <div className={classNames(styles.navBar, darkTheme && styles.nightMode)}>
                {renderItems(items)}
            </div>
            <div className={styles.navBarMask} onClick={toggleNav}></div>
        </div> 
    );
};

export default NavBar;