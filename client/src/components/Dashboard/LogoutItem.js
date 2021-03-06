import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { routerRoutes } from '../../constants/routerRoutes';
import parentClasses from './Dashboard.module.scss';
import styles from './LogoutItem.module.scss';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const LogoutItem = () => {
    const darkTheme = useTheme();

    return (
        <div className={classNames(
            parentClasses.gridItem,
            parentClasses.shrink
            )}>
            <h3 className={parentClasses.gridItemHeader}>Log out</h3>
            <div className={parentClasses.flexCenter}>
                <Link to={routerRoutes.logout}>
                    <div className={styles.logoutIconWrapper}> 
                        <FontAwesomeIcon icon={faSignOutAlt} className={classNames(
                            styles.logoutIcon,
                            darkTheme && styles.dark
                        )}/>
                    </div>
                </Link>
            </div>
        </div>
    )
};

export default LogoutItem;