import React from 'react';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useThemeUpdate, useTheme } from '../../contexts/ThemeContext';

const NightmodeButton = () => {
    const darkTheme = useTheme();
    const updateTheme = useThemeUpdate();

    return (
        <button 
            className={styles.nightmode_button} 
            onClick={updateTheme}
        >
            <FontAwesomeIcon 
                icon={darkTheme ? faSun : faMoon} 
                style={{fontSize:"1.5rem"}}
            />
            <div className={styles.nightmode_button_caption}> 
                {darkTheme ? `Day mode` : `Night mode`}
            </div>
        </button>
    );
};

export default NightmodeButton;