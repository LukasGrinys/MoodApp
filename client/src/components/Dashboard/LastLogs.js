import React from 'react';
import { Link } from 'react-router-dom';
import parentStyles from './Dashboard.module.scss';
import styles from './LastLogs.module.scss';
import LoadingNetItem from '../Loading/loadingNetItem';
import { useTheme } from '../../contexts/ThemeContext';
import { useSelector } from 'react-redux';
import Button from '../Button/Button';
import classNames from 'classnames';

const LastLogs = () => {
    const darkTheme = useTheme();
    const { lastLogs, isFetchingLogs } = useSelector( ({logs}) => {
        return {
            lastLogs : logs.lastLogs,
            isFetchingLogs : logs.isFetchingLogs
        }
    });

    return (
        <div className={parentStyles.gridItem}>
            <h3 className={parentStyles.gridItemHeader}>Last logs</h3>
            {
                isFetchingLogs ? (
                    <LoadingNetItem/>
                ) : ( (!lastLogs || !lastLogs.length) ? (
                        <div className={styles.greyText}>
                            There are no logs at the moment <br/><br/>
                            Write Your first one, by pressing the green button at the top
                        </div> 
                    ) : (
                        <div className={styles.logSection}> 
                            <div className={styles.logContainer}>
                                { lastLogs.slice(0,3).map( (log, index) => {
                                    return (
                                        <div key={index} className={styles.logItem}>
                                            <div className={styles.logContent}>
                                                <div className={classNames(
                                                    styles.ratingBox,
                                                    darkTheme && styles.dark
                                                )}>
                                                    {log.rating}
                                                </div>
                                                <div className={styles.rightSection}>
                                                    <div className={styles.date}>{log.date}</div>
                                                    <div className={styles.text}>{log.text}</div>
                                                </div>
                                            </div>
                                            <Link 
                                                to={`/logs/${log.id}`}
                                                className={classNames(
                                                    styles.link,
                                                    darkTheme && styles.dark
                                                )}
                                            >
                                                Read more
                                            </Link> 
                                        </div>
                                    )
                                })}
                            </div>
                            <Link to="/logs">
                                <Button>All Logs</Button>
                            </Link>
                        </div> )
                )
            }
            
        </div>
    )
};

export default LastLogs;