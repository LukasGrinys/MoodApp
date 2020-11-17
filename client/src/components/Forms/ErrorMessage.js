import React from 'react';
import styles from './Forms.module.scss';

const ErrorMessage = ({children}) => {
    return (
        <div className={styles.errorMessage}>
            {children}
        </div>
    );
};

export default ErrorMessage;