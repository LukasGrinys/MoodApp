
import { useCallback, useEffect, useState } from 'react';
import { getLogs, clearLogs } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';

export const useAllLogs = () => {
    const dispatch = useDispatch();
    const { user, logs } = useSelector( ({user, logs}) => { 
        return {
            user,
            logs
        }
    });
    const [ skipLogs, setSkipLogs ] = useState(3); 

    const { id : userId } = user;
    const { 
        allLogs, 
        isFetchingAllLogs, 
        fetchAllLogsError,
        noLogsLeft
    } = logs;

    useEffect( () => {
        if (userId) {
            dispatch(getLogs({
                userId, 
                start : 0, 
                limit : 3
            }));
        }
    }, [userId, dispatch]);

    useEffect( () => {
        return () => {
            dispatch(clearLogs());
        }
        // eslint-disable-next-line
    }, [])

    const loadMoreLogs = useCallback( () => {
        if (userId) {
            dispatch(getLogs({
                userId, 
                start : skipLogs, 
                limit : 3,
                currentLogs : allLogs
            }));

            setSkipLogs( prevState => prevState + 3);
        }
    }, [skipLogs, userId, allLogs, dispatch]);

    return {
        allLogs,
        isFetchingAllLogs, 
        fetchAllLogsError,
        noLogsLeft,
        loadMoreLogs
    }
}