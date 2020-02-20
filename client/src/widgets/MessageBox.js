import React from 'react';
import styles from './messagebox.module.css';

const MessageBox = (props) => {
    if (props.success) {
        return (
            <div className={styles.messageBox} style={{
                color: "green"
            }}>
                {props.text}
            </div>
        )
    } else {
        return (
            <div className={styles.messageBox} style={{
                color: "red"
            }}>
                {props.text}
            </div>
        )
    }
    
};

export default MessageBox;