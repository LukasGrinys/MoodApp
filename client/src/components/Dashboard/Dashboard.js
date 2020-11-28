import React, { useEffect } from 'react';
import AddNewLog from './AddNewLog';
import Loading from '../Loading/loading';
import { useTheme } from '../../contexts/ThemeContext';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Dashboard.module.scss';
import LastLogs from './LastLogs';
import MoodStatus from './MoodStatus';
import SettingsItem from './SettingsItem';
import LogoutItem from './LogoutItem';
import { getLastLogs } from '../../actions';

const Dashboard = () => {
    const darkTheme = useTheme();
    const isSignedIn = useSelector( ({user}) => user.isAuth );
    const userId = useSelector( ({user}) => user.id );
    const dispatch = useDispatch();

    useEffect( () => {
        if (userId) {
            dispatch(getLastLogs({
                userId,
                limit: 9
            }))
        }
    }, [userId, dispatch]);

    if (isSignedIn === undefined) {
        return (
            <Loading/>
        )
    }

    if (isSignedIn) {
        return (
            <div>
                <AddNewLog darkTheme={darkTheme}/>
                <div className={styles.grid}>
                    <h1 className={styles.gridTop}>Your dashboard</h1>
                    <LastLogs/>
                    <MoodStatus/>
                    <SettingsItem/>
                    <LogoutItem/>
                </div>
            </div>
        )
    }
}

export default Dashboard;