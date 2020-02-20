import React from 'react';
import styles from './loading.module.css';

const Loading = (props) => {
    const nightmode = props.nightmode;
    const returnBarStyle = (nm) => {
        if (nm === true) {
            return {  border: '1px solid #f2f2f2',
                    backgroundColor: '#f2f2f2'}
        }
        return null;
    }
    const returnTextStyle = (nm) => {
        if (nm === true) {
            return {
                color: '#f2f2f2'
            }
        }
        return null
    }

    return (
        <div className={styles.loadingScreen}>
            <div style={returnTextStyle(nightmode)}>
                Loading    
            </div>
            <br/>
            <div className={styles.barContainer}>
                <div className={styles.bar} style={returnBarStyle(nightmode)}></div>
                <div className={[styles.bar, styles.delay1].join(' ')} style={returnBarStyle(nightmode)}></div>
                <div className={[styles.bar, styles.delay2].join(' ')} style={returnBarStyle(nightmode)}></div>
            </div>
        </div>
    );
};

export default Loading;