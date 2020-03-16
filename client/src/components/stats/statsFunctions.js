// STATS FUNCTIONS
export function countAverage(list) {
    let sum = 0;
    for (let i = 0; i < list.length; i++) {
        let num = Number(list[i].rating);
        sum += num
    };
    return (Math.floor(sum * 10 / list.length) / 10)
};
export function lastSevenDaysAverage(list) {
    let dates = [];
    let sum = 0;
    let count = 0;
    for (let i = 0; i < list.length; i++) {
        let date = list[i].date;
        if (dates.indexOf(date) < 0) {
            dates.push(list[i].date);
            sum += Number(list[i].rating);
            count++;
        } else if (dates.indexOf(date) >= 0) {
            sum += Number(list[i].rating);
            count++;
        };
        if (dates.length >= 7) {
            break;
        }
    };
    const average = Math.floor(sum * 10 / count) / 10;
    const firstDay = dates[dates.length - 1] ? dates[dates.length - 1] : "N/A";
    const lastDay = dates[0] ? dates[0] : "N/A";
    return {
        average,
        firstDay,
        lastDay
    }
};
export function listToArray(list) {
    let arr = [];
    let firstDay = '';
    let lastDay = '';
    for (let i = 0; i < list.length; i++) {
        arr.push(Number(list[i].rating));
        if (i === 0) {
            lastDay = list[i].date;
        };
        if (i === list.length - 1) {
            firstDay = list[i].date;
        };
        if (i === 20) {
            firstDay = list[i].date;
            break;
        }
    };
    return {
        arr,
        firstDay,
        lastDay
    };
}
export function returnDaytimeStats(list) {
    let morningSum = 0;
    let morningCount = 0;
    let afternoonSum = 0;
    let afternoonCount = 0;
    let eveningSum = 0;
    let eveningCount = 0;
    for (let i = 0; i < list.length; i++) {
        if (list[i].timing === "Morning") {
            morningSum += Number(list[i].rating);
            morningCount++;
        }
        if (list[i].timing === "Afternoon") {
            afternoonSum += Number(list[i].rating);
            afternoonCount++;
        }
        if (list[i].timing === "Evening") {
            eveningSum += Number(list[i].rating);
            eveningCount++;
        }
    };
    const morningAverage = morningCount === 0 ? "N/A" : Math.floor(morningSum * 10 / morningCount) / 10;
    const afternoonAverage = afternoonCount === 0 ? "N/A" : Math.floor(afternoonSum * 10 / afternoonCount) / 10;
    const eveningAverage = eveningCount === 0 ? "N/A" : Math.floor(eveningSum * 10 / eveningCount) / 10;
    return {
        morningAverage,
        afternoonAverage,
        eveningAverage
    }
};
