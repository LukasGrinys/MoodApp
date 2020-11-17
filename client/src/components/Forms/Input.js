import React from 'react';
import styles from './Forms.module.scss';

const Input = ({type, name, value, controlEvents}) => {
    const { handleChange, handleBlur } = controlEvents;

    if (type === 'text' || type === 'email' || type === 'password') {
        return (
            <input 
                type={type} 
                name={name} 
                value={value}
                className={styles.textInput}
                onChange={handleChange}
                onBlur={handleBlur}
            />
        );
    }

};

export default Input;