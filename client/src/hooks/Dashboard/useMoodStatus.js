import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const useMoodStatus = () => {
    const { logs : lastLogs, isFetching : isFetchingLogs } = useSelector( ({logs}) => logs.lastLogs);

    const rating = useMemo( () => {
        if (!lastLogs || !Array.isArray(lastLogs) || !lastLogs.length) {
            return 'N/A';
        }

        let total = 0;
        let count = 0;

        lastLogs.forEach( log => {
            total += parseInt(log.rating);
            count++;
        });

        const average = Math.round(((total/count)*10)/10);

        if (Number.isInteger(average)) {
            return `${average}.0`
        }

        return String(average);
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

        const parsedRating = parseInt(rating);

        if (parsedRating >= 7.5) {
            return 'Great';
        }

        if (parsedRating >= 5) {
            return 'Good';
        }

        if (parsedRating >= 3) {
            return 'Average';
        }

        if (parsedRating < 3) {
            return 'Bad';
        }

        return '';
    }, [lastLogs, rating])

    return {
        rating,
        ratingText,
        lastLogs,
        isFetchingLogs
    }
}