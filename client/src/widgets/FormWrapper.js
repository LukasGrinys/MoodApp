import React from 'react';
import styles from './formwrapper.module.css';

const FormWrapper = (props) => {
    return (
        <div className={styles.formWrapper}>
            {props.children}
        </div>
    );
};

export default FormWrapper;