import React, { useEffect } from 'react';
import { getLog, clearLog } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading/loading';
import BackButton from '../Back/BackButton';
import LogItem from '../LogItem/logItem';
import ErrorBox from '../ErrorBox/ErrorBox';
import styles from './logview.module.css';

const LogView = (props) => {
    const dispatch = useDispatch();
    const { logData, isFetchingLog, getLogError } = useSelector( ({logs}) => logs);

    useEffect( () => {
        if (
            props.match && 
            props.match.params &&
            props.match.params.id
        ) {
            dispatch(getLog(props.match.params.id));
        }


        return () => {
            dispatch(clearLog());
        }
        // eslint-disable-next-line
    }, []);

    if (!logData || isFetchingLog) {
        return <Loading/>
    }

    return (
        <div className={styles.pageWrapper}>
            <BackButton/>
            {
                logData && Boolean(Object.keys(logData).length) && (
                    <LogItem 
                        rating={logData.rating}
                        timing={logData.timing}
                        date={logData.date}
                        text={logData.text}
                    />
                )
            }
            {
                getLogError && (
                    <ErrorBox>
                        {getLogError}
                    </ErrorBox>
                )
            }
        </div>
    )
}

export default LogView