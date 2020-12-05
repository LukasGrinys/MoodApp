import React from 'react';
import styles from './Forms.module.scss';

const Input = ({type, name, value, controlEvents, placeholder}) => {
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

    if (type === 'textarea') {
        return (
            <textarea 
                name={name}
                onChange={handleChange}
                onBlur={handleBlur}
                value={value}
                placeholder={placeholder}
                className={styles.textArea}
            />
        )
    }

};

Input.defaultProps = {
    type : 'text',
    name : '',
    value : '',
    controlEvents : {
        handleBlur : () => {},
        handleChange : () => {}
    },
    placeholder: ''
}

export default Input;