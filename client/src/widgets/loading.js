import React from 'react';
import styles from './loading.module.css';
import { returnBarStyle, returnLightGrey } from './nightmodeColors';
import { useTheme } from './../contexts/ThemeContext';

const Loading = () => {
    const darkTheme = useTheme();
    return (
        <div className={styles.loadingScreen}>
            <div style={returnLightGrey(darkTheme)}>
                Loading    
            </div>
            <br/>
            <div className={styles.barContainer}>
                <div className={styles.bar} style={returnBarStyle(darkTheme)}></div>
                <div className={[styles.bar, styles.delay1].join(' ')} style={returnBarStyle(darkTheme)}></div>
                <div className={[styles.bar, styles.delay2].join(' ')} style={returnBarStyle(darkTheme)}></div>
            </div>
        </div>
    );
};

export default Loading;