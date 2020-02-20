import React from 'react';
import styles from './button.module.css';

const ButtonWid = (props) => {
    return (
        <div  
                style={{
                color: props.color,
                backgroundColor: props.background
            }}
            className={styles.button}
        >
            {props.children}
        </div>
    );
};

export default ButtonWid;