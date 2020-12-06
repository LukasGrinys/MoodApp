import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { canUserLog, postLog, clearLogPost } from '../../actions/logs/asyncActions';
import { useHistory } from 'react-router-dom';
import { routerRoutes } from '../../constants/routerRoutes';
import { getDate, getDaytime } from '../../util/dateHelpers';

export const useAddLog = () => {
    const dispatch = useDispatch();
    const userId = useSelector( ({user}) => user.userData.id);
    const { postLogSuccess, postLogError, canLog } = useSelector( ({logs}) => {
        return {
            postLogSuccess : logs.postLogSuccess,
            postLogError : logs.postLogError,
            canLog : logs.canLog
        }
    });
    const [message, setMessage] = useState('');
    const [moodRating, setMoodRating] = useState(5);
    const [isPostingLog, setIsPostingLog] = useState(false);
    const history = useHistory();

    useEffect( () => {
        if (userId) {
            dispatch(canUserLog(getDate(), getDaytime(), userId))
        }
    }, [userId, dispatch]);

    const handleRangeInput = useCallback( (event) => {
        setMoodRating(Number(event.target.value))
    }, []);

    const handleMessageInput = useCallback( (event) => {
        setMessage(event.target.value)
    }, [])

    const handleAddLog = useCallback( async () => {
        if (moodRating && userId) {
            setIsPostingLog(true);

            await dispatch(postLog({
                userId,
                date : getDate(),
                timing : getDaytime(),
                rating : moodRating,
                text : message
            }));

            setIsPostingLog(false);
        };

    }, [userId, moodRating, message, dispatch]);

    useEffect( () => {
        if (postLogSuccess) {
            dispatch(clearLogPost());

            history.push(routerRoutes.dashboard);
        }
    }, [postLogSuccess, dispatch, history]);

    useEffect( () => {
        if (canLog === false) {
            history.push(routerRoutes.dashboard);
        }
    }, [canLog, dispatch, history])
    
    const returnMoodText = rating => {
        if (rating >= 9) { 
            return "Awesome!" 
        } else if (rating >= 7) { 
            return "Good";
        } else if (rating >= 5) { 
            return "Average";
        } else if (rating >= 3) {
            return "Not well";
        } else if (rating < 3) { 
            return "Bad";
        }

        return '';
    }

    return {
        returnMoodText,
        postLogError,
        canLog,
        message,
        moodRating,
        isPostingLog,
        handleRangeInput,
        handleMessageInput,
        handleAddLog
    }
}