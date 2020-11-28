import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import LoadingNetItem from '../Loading/loadingNetItem';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../Button/Button';
import parentClasses from './Dashboard.module.scss';
import styles from './MoodStatus.module.scss';
import { useMoodStatus } from '../../hooks/Dashboard/useMoodStatus';
import classNames from 'classnames';

const MoodStatus = () => {
    const darkTheme = useTheme();

    const {
        rating,
        ratingText,
        isFetchingLogs
    } = useMoodStatus();

    return (
        <div className={classNames(
            parentClasses.gridItem,
            styles.statusContainer
        )}>
            {
                !isFetchingLogs ? (
                    <Fragment>
                        <h3 className={parentClasses.gridItemHeader}>Latest mood status</h3>
                        <div className={classNames(
                            styles.statusBox,
                            darkTheme && styles.dark
                        )}>{rating}</div>
                        <div className={styles.statusText}>{ratingText}</div>
                        <Link to="/stats">
                            <Button>Stats</Button> 
                        </Link>
                    </Fragment>
                ) : (
                    <LoadingNetItem/>
                )
            }
        </div>
    )
};

export default MoodStatus;