import React from 'react';
import styles from './button.module.css';

const ButtonWid = (props) => {
    const returnColor = () => {
        if (props.nightmode === "true") {
            return ({
                color: "#0d0d0d",
                background: "#d2d2d2"
            })
        } else {
            return ({
                color: props.color,
                backgroundColor: props.background
            })
        }
    }

    return (
        <div  
                style={returnColor()}
            className={styles.button}
        >
            {props.children}
        </div>
    );
};

export default ButtonWid;