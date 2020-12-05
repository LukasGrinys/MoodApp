import React from 'react';
import FontAwesome from 'react-fontawesome';
import styles from './Header.module.scss';

const ToggleButton = ({showNav, toggleNav}) => {
    return (
        <div className={styles.bars}>
            {
                 showNav ?
                 <FontAwesome
                     name="close"
                     onClick={toggleNav}
                     style={{
                         fontSize: '1.5em',
                         padding: "2px",
                         color: "#f2f2f2",
                         transform: "rotate(90deg)",
                         transition: "0.5s"
                     }}
                 />
             :
                 <FontAwesome
                     name="bars"
                     onClick={toggleNav}
                     style={{
                         fontSize: '1.5em',
                         padding: "2px",
                         color: "#f2f2f2",
                         transform: "rotate(180deg)",
                         transition: "0.5s"
                     }}
                 />
            }
        </div>
       
    );
};

export default ToggleButton;