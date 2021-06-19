import React from 'react';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';

const ToggleButton = ({showNav, toggleNav}) => {
    return (
        <div className={styles.bars}>
            {
                showNav ?
                    <FontAwesomeIcon
                        icon={faTimes}
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
                 <FontAwesomeIcon
                     icon={faBars}
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