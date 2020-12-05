import React from 'react';
import classNames from 'classnames';
import styles from './AverageBox.module.scss';
import { useTheme } from './../../contexts/ThemeContext';

const AverageBox = ( {children }) => {
    const darkTheme = useTheme();

    return (
        <div className={classNames(
            styles.averageBox,
            darkTheme && styles.dark
        )}>
            {children}
        </div>
    )
}

export default AverageBox;