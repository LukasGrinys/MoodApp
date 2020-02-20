import React from 'react';
import styles from './css/header.module.css';

const NavModal = (props) => {
    return (
        <div className={styles.navBarDark} onClick={props.closeNav}></div>
    );
};

export default NavModal;

