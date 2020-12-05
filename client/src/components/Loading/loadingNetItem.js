import React from 'react';
import styles from './loadingNetItem.module.css';

const LoadingNetItem = () => {
    return (
        <div className={styles.loadingScreen}>
            <div className={styles.barContainer}>
                <div className={styles.bar}></div>
                <div className={[styles.bar, styles.delay1].join(' ')}></div>
                <div className={[styles.bar, styles.delay2].join(' ')}></div>
            </div>
        </div>
    );
};

export default LoadingNetItem;