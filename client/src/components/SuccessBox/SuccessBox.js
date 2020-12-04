import React from 'react';
import styles from './SuccessBox.module.scss';

const SuccessBox = ({children}) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
};

export default SuccessBox;