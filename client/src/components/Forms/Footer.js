import React from 'react';
import styles from './Forms.module.scss'

const Footer = ({children}) => {
    return (
        <div className={styles.formFooter}>
            {children}
        </div>
    );
};

export default Footer;