import React from 'react';
import styles from './Header.module.scss';
import { connect } from 'react-redux';
import NavBar from '../Navbar/NavBar';
import ToggleButton from './ToggleButton';
import NightmodeButton from './NightmodeButton';
import classNames from 'classnames';
import { useHeader } from '../../hooks/Header/useHeader';
import { useThemeUpdate, useTheme } from '../../contexts/ThemeContext';

const Header = ( {isAuth} ) => {
    const darkTheme = useTheme();
    const updateTheme = useThemeUpdate();
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
                <div className={styles.logo}>
                    Moodapp
                </div>
                <ToggleButton
                    showNav={showNav}
                    toggleNav={toggleNav}
                />
                <NightmodeButton
                    updateTheme={updateTheme}
                    darkTheme={darkTheme}
                />
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