import React from 'react';
import { useTheme } from './../contexts/ThemeContext';
import { ratingButtonStyle } from './nightmodeColors';
import styles from './moodbox.module.css';

const MoodBox = ({children}) => {
    const darkTheme = useTheme();
    return (
        <div className={styles.moodbox} style={ratingButtonStyle(darkTheme)}>
            {children}
        </div>
    );
};

export default MoodBox;