import React from 'react';
import styles from './logItem.module.css';
import FontAwesome from 'react-fontawesome';

const LogItem = (props) => {
    const date = props.date;
    const timing = props.timing;
    const text = props.text;
    const rating = props.rating;
    return (
        <div className={styles.item}>
            <div className={styles.top_line}>
                <div className={styles.rating_box}>
                    {rating}
                </div>
                <div>
                    <FontAwesome name="hourglass" className={styles.icon}/>
                    {timing}
                </div>
                <div className={styles.date}>
                    <FontAwesome name="calendar" className={styles.icon}/>
                    {date}
                </div>
            </div>
            <div className={styles.text}>
                {text}
            </div>
        </div>
   
   );
};

export default LogItem