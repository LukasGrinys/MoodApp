import { daytimes } from '../constants/daytimes';

export const getDate = () => {
    const date = new Date();
    
    const month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;  
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const fullDate = [date.getFullYear(), month, day].join('-');

    return fullDate;
}

export const getDaytime = () => {
    const date = new Date();

    const hour = date.getHours();

    if (hour >= 7 && hour <= 12) {
        return daytimes.morning
    }

    if (hour > 12 && hour <= 19) {
        return daytimes.afternoon
    }

    if (hour > 19 && hour <= 23) {
        return daytimes.evening
    }

    if (hour < 7) {
        return daytimes.night
    }

    return null
}