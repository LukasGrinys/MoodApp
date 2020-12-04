import React, {Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLogs, clearLogs } from './../../actions';
import Loading from '../Loading/loading';
import GraphCanvas from './GraphCanvas';
import DaytimeGraph from './DaytimeGraph';
import styles from './stats.module.css';
import { countAverage, lastSevenDaysAverage } from '../../util/statsHelpers';
import BackButton from '../Back/BackButton';
import ErrorBox from '../ErrorBox/ErrorBox';
import AverageBox from './AverageBox';

const Stats = () => {
    const dispatch = useDispatch();
    const { user, logs } = useSelector( ({user, logs}) => {
        return { user, logs }
    });
    const { id : userId } = user;
    const { allLogs, fetchAllLogsError, isFetchingAllLogs } = logs; 
    
    useEffect( () => {
        if (userId) {
            dispatch(getLogs({userId, limit : 100}));
        }
    }, [userId, dispatch]);

    useEffect( () => {
        return () => {
            dispatch(clearLogs());
        }
    }, [dispatch])

    if (isFetchingAllLogs || !userId || !allLogs) {
        return <Loading/>
    }

    if (fetchAllLogsError) {
        return <ErrorBox>{fetchAllLogsError}</ErrorBox>
    }

    const sevenDayAverageObject = lastSevenDaysAverage(allLogs);

    if (allLogs && Array.isArray(allLogs) && allLogs.length) {
        return (
            <Fragment>
                <BackButton/>
                <div className={styles.container}>
                    <h1>User stats</h1>
                    <div className={styles.first_block}>
                        <div className={styles.average_block}>
                            <p><strong>Your average mood:</strong></p>
                            <AverageBox>{countAverage(allLogs)}</AverageBox>
                            <div className={styles.small_text_box}>Retrieved from the last 100 logs</div>
                        </div>
                        <div className={styles.average_block}>
                            <b>7 day mood:</b>
                            <AverageBox>{sevenDayAverageObject.average}</AverageBox>
                            <div className={styles.small_text_box}>Counted from the last 7 active days from <br/>
                            {sevenDayAverageObject.firstDay} to {sevenDayAverageObject.lastDay}</div>
                        </div>
                    </div>
                    <GraphCanvas logs={allLogs}/>
                    <DaytimeGraph logs={allLogs}/>
                </div>
            </Fragment>
        )
    }
}

export default Stats;
