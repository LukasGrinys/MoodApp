import React from 'react';
import styles from './backButton.module.css';
import FontAwesome from 'react-fontawesome';

const BackButton = () => {
    return (
        <div className={styles.top_panel}>
            <div className={styles.back_button} onClick={ () => {window.history.back()}}>
                <FontAwesome name="arrow-left" className={styles.back}/>
                <div className={styles.button_text}>
                    Go back
                </div>
            </div>
        </div>
        
    );
};

export default BackButton;