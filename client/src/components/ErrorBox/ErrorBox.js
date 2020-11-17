import React from 'react';
import styles from './ErrorBox.module.scss';

const ErrorBox = ({children}) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
};

export default ErrorBox;