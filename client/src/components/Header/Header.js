import React from 'react';
import styles from './Header.module.scss';
import { connect } from 'react-redux';
import NavBar from '../Navbar/NavBar';
import ToggleButton from './ToggleButton';
import NightmodeButton from './NightmodeButton';
import Logo from '../Logo';
import classNames from 'classnames';
import { useHeader } from '../../hooks/Header/useHeader';
import { useTheme } from '../../contexts/ThemeContext';

const Header = ( {isAuth} ) => {
    const darkTheme = useTheme();
    const {
        showNav,
        toggleNav
    } = useHeader();

    return (
        <div className={styles.header}>
            <div 
                className={classNames(styles.top, darkTheme && styles.nightMode)} 
                style={darkTheme ? {backgroundColor: "#2F2F2F"} : {}}
            >
                <div className={styles.logoContainer}>
                    <Logo className={styles.logo} showWhite={true}/>
                </div>
                <ToggleButton
                    showNav={showNav}
                    toggleNav={toggleNav}
                />
                <NightmodeButton/>
            </div>
            {showNav && <NavBar toggleNav={toggleNav} isAuth={isAuth}/>}
        </div>
    );
}

function mapStateToProps({user}) {
    const { isAuth } = user;

    return { isAuth }
}


export default connect(mapStateToProps)(Header);