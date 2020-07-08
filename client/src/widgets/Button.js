import React from 'react';
import styles from './button.module.css';

const ButtonWid = (props) => {
    const returnStyle = (nightmode, isDisabled) => {
        let styleObject = {};
        // Color properties
        if (nightmode === "true") {
            styleObject.color = "#0d0d0d";
            styleObject.background = "#d2d2d2";
        } else {
            styleObject.color = props.color;
            styleObject.background = props.background;
        }
        // Disabled
        if (isDisabled) {
            styleObject.background = '#cccccc';
            styleObject.color = '#808080';
            styleObject.cursor = 'not-allowed';
        };
        return styleObject;
    }
    // const returnColor = () => {
    //     if (props.nightmode === "true") {
    //         return ({
    //             color: "#0d0d0d",
    //             background: "#d2d2d2"
    //         })
    //     } else {
    //         return ({
    //             color: props.color,
    //             backgroundColor: props.background
    //         })
    //     }
    // }

    // const disableButton = (disabled) => {
    //     if (disabled) {
    //         return {
    //             cursor: 'default',
    //             background: 'grey'
    //         } 
    //     }
    // }  

    return (
        <div  
                style={returnStyle(props.nightmode, props.disabled)}
            className={styles.button} 
        >
            {props.children}
        </div>
    );
};

export default ButtonWid;