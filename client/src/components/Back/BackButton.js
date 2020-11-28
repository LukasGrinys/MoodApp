import React from 'react';
import styles from './BackButton.module.scss';
import FontAwesome from 'react-fontawesome';
import { useTheme } from '../../contexts/ThemeContext';
import classNames from 'classnames';

const BackButton = () => {
    const darkTheme = useTheme();

    return (
        <div className={styles.container}>
            <div 
                className={classNames(
                    styles.button,
                    darkTheme && styles.dark
                )} 
                onClick={ () => {window.history.back()}}
            >
                <FontAwesome name="arrow-left"/>
                <div className={styles.text}>
                    Go back
                </div>
            </div>
        </div>
        
    );
};

export default BackButton;