import React, { useState } from 'react';
import styles from './css/header.module.css';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import NavBar from './navBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Logo } from './logo_white.svg';

import { useThemeUpdate, useTheme } from './ThemeContext';

const Header = ( props ) => {
    const [ openNav, changeNavState ] = useState(false);
    const darkTheme = useTheme();

    const returnStyle = () => {
        if (darkTheme === true) {
            return { backgroundColor: "#2F2F2F"}
        } 
        return null
    }

    const toggleNav = () => {
        changeNavState( !openNav );
    }


    const makeInvisible = () => (
        props.user.data ?
        {opacity : "1"} :
        {opacity : "0"}
    )

    const returnButton = () => (
        openNav ?
            <FontAwesome
            name="close"
            onClick={toggleNav}
            style={{
                    fontSize: '1.5em',
                    padding: "2px",
                    color: "#f2f2f2",
                    transform: "rotate(90deg)",
                    transition: "0.5s"
            }}/>
         :
            <FontAwesome
            name="bars"
            onClick={toggleNav}
            style={
                {
                    fontSize: '1.5em',
                    padding: "2px",
                    color: "#f2f2f2",
                    transform: "rotate(180deg)",
                    transition: "0.5s"
            }}/>
    )

    const showItems = () => (
        openNav ?
        <NavBar toggleNav={toggleNav} isAuth={props.user.data.isAuth}/>
        : null
    )

    const updateTheme = useThemeUpdate();

    const showNightmodeButton = () => (
        <div className={styles.nightmode_button} onClick={updateTheme}>
            <FontAwesomeIcon icon={darkTheme === true ? faSun : faMoon} style={{fontSize:"1.5rem"}}></FontAwesomeIcon>
            <div className={styles.nightmode_button_caption}> {darkTheme === true ? `Day mode` : `Night mode`}</div>
        </div>
    )

    return (
            <div className={styles.header}>
                <div className={styles.top} style={returnStyle()}>
                    <div className={styles.logo_box}>
                        <Logo className={styles.logo}/>
                    </div>
                    <div className={styles.bars} style={makeInvisible()}>
                        {returnButton()}
                    </div>
                    {showNightmodeButton()}
                </div>
                {showItems()}
            </div>
    );
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}


export default connect(mapStateToProps)(Header);