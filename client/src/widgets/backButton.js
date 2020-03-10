import React from 'react';
import styles from './backButton.module.css';
import FontAwesome from 'react-fontawesome';
import { returnWhite} from './nightmodeColors';
const BackButton = (props) => {
    return (
        <div className={styles.top_panel}>
            <div className={styles.back_button} onClick={ () => {window.history.back()}}>
                <FontAwesome name="arrow-left" className={styles.back} style={returnWhite(props.nightmode)}/>
                <div className={styles.button_text} style={returnWhite(props.nightmode)}>
                    Go back
                </div>
            </div>
        </div>
        
    );
};

export default BackButton;