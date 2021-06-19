import React from 'react';
import { Link } from 'react-router-dom';
import parentClasses from './Dashboard.module.scss';
import styles from './SettingsItem.module.scss';
import { routerRoutes } from '../../constants/routerRoutes';
import { useTheme } from '../../contexts/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames';

const SettingsItem = () => {
    const darkTheme = useTheme();

    return (
        <div className={classNames(
            parentClasses.gridItem,
            parentClasses.shrink
            )}>
            <h3 className={parentClasses.gridItemHeader}>Settings</h3>
            <div className={parentClasses.flexCenter}>
                <div className={styles.settingsIconWrapper}>
                    <Link to={routerRoutes.settings}>
                        {}
                        <FontAwesomeIcon icon={faCog} className={classNames(
                            styles.settingsIcon,
                            darkTheme && styles.dark
                            )}/>
                    </Link>
                </div>    
            </div>
        </div>
    );
};

export default SettingsItem;