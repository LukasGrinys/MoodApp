import React from 'react';
import styles from './Button.module.scss';
import { useTheme } from '../../contexts/ThemeContext';
import classNames from 'classnames';

/* 
    Possible colours:
    'primary'
    'white'
*/

const Button = ({
    color = 'primary', 
    handleClick = () => {},
    disabled,
    children
}) => {
    const darkTheme = useTheme();
    
    const getButtonColorClass = (type) => {
        switch (type) {
            case 'primary':
                return styles.btnPrimary;
            case 'white' :
                return styles.btnWhite;
            default :
                return null;
        }
    }
    
    return (
        <button 
            className={classNames(
                styles.button,
                darkTheme && styles.btnDark,
                getButtonColorClass(color)
            )}
            onClick={handleClick}
            disabled={disabled}
            type="button"
        >
            {children}
        </button>
    );
};

export default Button;