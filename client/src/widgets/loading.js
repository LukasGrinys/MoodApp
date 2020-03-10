import React from 'react';
import styles from './loading.module.css';
import { returnBarStyle, returnLightGrey } from './nightmodeColors';

const Loading = (props) => {
    const nightmode = props.nightmode;
    return (
        <div className={styles.loadingScreen}>
            <div style={returnLightGrey(nightmode)}>
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