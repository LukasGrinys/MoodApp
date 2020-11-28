import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import parentClasses from './Dashboard.module.scss';
import styles from './SettingsItem.module.scss';
import { routerRoutes } from '../../constants/routerRoutes';
import { useTheme } from '../../contexts/ThemeContext';
import classNames from 'classnames';

const SettingsItem = () => {
    const darkTheme = useTheme();

    return (
        <div className={parentClasses.gridItem}>
            <h3 className={parentClasses.gridItemHeader}>Settings</h3>
            <div className={parentClasses.flexCenter}>
                <div className={styles.settingsIconWrapper}>
                    <Link to={routerRoutes.settings}>
                        <FontAwesome name="cog" className={classNames(
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