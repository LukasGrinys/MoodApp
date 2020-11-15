import React from 'react';
import styles from './messagebox.module.css';
import { useTheme } from './../contexts/ThemeContext';

const MessageBox = (props) => {
    const darkTheme = useTheme();

    if (darkTheme === true) {
        return (
            <div className={styles.messageBox} style={{ color: "#f2f2f2"}}>
                {props.text}
            </div>
        )
    };
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