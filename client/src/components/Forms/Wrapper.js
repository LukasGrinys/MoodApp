import React from 'react';
import styles from './Forms.module.scss';

const Wrapper = ({children}) => {
    return <div className={styles.formWrapper}>{children}</div>
};

export default Wrapper;