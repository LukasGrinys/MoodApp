import moodTypes from '../constants/moodTypes';

export const returnMoodText = unparsedRating => {
    const rating = parseInt(unparsedRating);

    const moodType = moodTypes.find( type => type.above < rating && type.below >= rating);

    if (!moodType) {
        return '';
    }

    return moodType.text
}

export const returnAverageRating = logs => {
    let total = 0;
    let count = 0;

    logs.forEach( log => {
        total += parseInt(log.rating);
        count++;
    });

    const average = Math.round(((total/count)*10)/10);

    if (Number.isInteger(average)) {
        return `${average}.0`
    }

    return String(average);
}