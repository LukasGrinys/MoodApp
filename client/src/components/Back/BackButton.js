import React from 'react';
import styles from './BackButton.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
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
                <FontAwesomeIcon icon={faArrowLeft}/>
                <div className={styles.text}>
                    Go back
                </div>
            </div>
        </div>
        
    );
};

export default BackButton;