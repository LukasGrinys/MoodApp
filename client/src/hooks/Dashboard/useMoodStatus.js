import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { returnMoodText, returnAverageRating } from '../../util/moodStatusHelpers';

export const useMoodStatus = () => {
    const { logs : lastLogs, isFetching : isFetchingLogs } = useSelector( ({logs}) => logs.lastLogs);

    const rating = useMemo( () => {
        if (!lastLogs || !Array.isArray(lastLogs) || !lastLogs.length) {
            return 'N/A';
        }

        return returnAverageRating(lastLogs);
    }, [lastLogs]);

    const ratingText = useMemo( () => {
        if (
            !lastLogs || 
            !Array.isArray(lastLogs) || 
            !lastLogs.length || 
            rating === 'N/A'
        ) {
            return ''
        }

        return returnMoodText(rating);
    }, [lastLogs, rating])

    return {
        rating,
        ratingText,
        lastLogs,
        isFetchingLogs
    }
}