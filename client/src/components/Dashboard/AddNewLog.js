import React, { useEffect } from 'react';
import FontAwesome from 'react-fontawesome'
import { connect } from 'react-redux';
import { canUserLog } from '../../actions/logs/asyncActions';
import styles from './AddNewLog.module.scss';
import LoadingNetItem from '../Loading/loadingNetItem';
import { Link } from 'react-router-dom';
import { getDate, getDaytime } from '../../util/dateHelpers';
import { daytimes } from '../../constants/daytimes';
import { routerRoutes } from '../../constants/routerRoutes';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';

export const returnTimeRemaining = () => {
    let currentTiming = getDaytime();
    let timeOfNextLog = 0;
    
    switch(currentTiming) {
        case daytimes.morning:
            timeOfNextLog = 13;
            break;
        case daytimes.afternoon :
            timeOfNextLog = 20;
            break;
        case daytimes.evening :
            timeOfNextLog = 7;
            break;
        default:
            timeOfNextLog = 7;
    };

    return `${timeOfNextLog}:00`
}

const AddNewLog = ({userId, canLog, darkTheme}) => {
    const dispatch = useDispatch();

    useEffect( () => {
        if (userId) {
            const date = getDate();
            const timing = getDaytime();
            
            dispatch(canUserLog(date, timing, userId))
        }
        // eslint-disable-next-line
    }, [userId]);

    if (canLog === null) {
        return <LoadingNetItem/>
    } 

    if (canLog && getDaytime() !== daytimes.night) {
        return (
            <Link to={routerRoutes.addNewLog}>
                <div className={classNames(
                    styles.logbutton, 
                    styles.available,
                    darkTheme && styles.dark
                    )}>
                    <div className={styles.attentionBorder}/>
                    <FontAwesome name="fas fa-plus" className={styles.floating}/> ADD LOG
                </div>
            </Link> 
        )
    }

    return (
        <div className={classNames(styles.logbutton, styles.unavailable)}>
            Next log will be available at: {returnTimeRemaining()}
        </div>
    )
};

function mapStateToProps({logs, user}) {
    const userId = (user && user.userData && user.userData.id) ? user.userData.id : null;
    const { canLog } = logs; 

    return { canLog, userId }
}

export default connect(mapStateToProps)(AddNewLog);