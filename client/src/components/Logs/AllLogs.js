import React from 'react';
import Loading from '../Loading/loading';
import BackButton from '../Back/BackButton';
import styles from './AllLogs.module.scss';
import Button from '../Button/Button';
import LogItem from '../LogItem/logItem';
import LoadingNetItem from '../Loading/loadingNetItem';
import ErrorBox from '../ErrorBox/ErrorBox';
import { useAllLogs } from '../../hooks/AllLogs/useAllLogs';

const AllLogs = () => {
    const { 
        allLogs,
        isFetchingAllLogs, 
        fetchAllLogsError,
        noLogsLeft,
        loadMoreLogs 
    } = useAllLogs();

    if (!allLogs) {
        return <Loading/>
    }

    if (
        allLogs && 
        Array.isArray && 
        allLogs.length
    ) {
        return (
            <div className={styles.pageWrapper}>
                <BackButton/>
                <h1>All logs</h1>
                <div>
                    {
                        allLogs.map( (item, i) => {
                            return (
                                <LogItem 
                                    key={i} 
                                    rating={item.rating} 
                                    date={item.date} 
                                    timing={item.timing} 
                                    text={item.text}
                                />
                            ) 
                        })
                    }
                </div>
                <div className={styles.bottomSection}>
                    {
                        isFetchingAllLogs ? (
                            <LoadingNetItem/>
                        ) : !noLogsLeft && (
                            <Button
                                handleClick={loadMoreLogs}
                            >
                                Load more
                            </Button>
                        ) 
                    }
                    {
                        fetchAllLogsError && (
                            <ErrorBox>
                                {fetchAllLogsError}
                            </ErrorBox>
                        )
                    }
                </div>
            </div>
        )
    }

}

export default AllLogs;