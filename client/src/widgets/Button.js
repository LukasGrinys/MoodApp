import React from 'react';
import styles from './button.module.css';
import { useTheme } from './../hoc/ThemeContext';


const ButtonWid = (props) => {
    const darkTheme = useTheme();

    const returnStyle = (darkTheme, isDisabled) => {
        let styleObject = {};
        // Color properties
        if (darkTheme) {
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

    return (
        <div  
            style={returnStyle(darkTheme, props.disabled)}
            className={styles.button} 
        >
            {props.children}
        </div>
    );
};

export default ButtonWid;