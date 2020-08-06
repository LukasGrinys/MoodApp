import React from 'react';
import styles from './css/header.module.css';

import NavBarItems from './navBarItems';
import NavModal from './navModal';

const NavBar = (props) => {
    return (
        <div>
            <div className={styles.navBar}>
                <NavBarItems toggleNav={props.toggleNav}/>
            </div>
            <NavModal closeNav={props.closeNav}/>
        </div> 
    );
};

export default NavBar;