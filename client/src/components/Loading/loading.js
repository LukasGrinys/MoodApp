import React from 'react';
import styles from './loading.module.css';
import { useTheme } from '../../contexts/ThemeContext';
import classNames from 'classnames'

const Loading = () => {
    const darkTheme = useTheme();

    return (
        <div className={styles.loadingScreen}>
            <div>
                Loading    
            </div>
            <br/>
            <div className={classNames(
                styles.barContainer,
                darkTheme && styles.dark
            )}>
                <div className={styles.bar}></div>
                <div className={[styles.bar, styles.delay1].join(' ')}></div>
                <div className={[styles.bar, styles.delay2].join(' ')}></div>
            </div>
        </div>
    );
};

export default Loading;