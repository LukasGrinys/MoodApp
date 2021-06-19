import React from 'react';
import styles from './logItem.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglass, faCalendar } from '@fortawesome/free-solid-svg-icons';

const LogItem = ({date, timing, text, rating}) => {
    return (
        <div className={styles.item}>
            <div className={styles.top_line}>
                <div className={styles.rating_box}>
                    {rating}
                </div>
                <div>
                    <FontAwesomeIcon icon={faHourglass} className={styles.icon}/>
                    {timing}
                </div>
                <div className={styles.date}>
                    <FontAwesomeIcon icon={faCalendar} className={styles.icon}/>
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