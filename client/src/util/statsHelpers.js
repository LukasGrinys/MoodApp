export function countAverage(list) {
    if (!list || !Array.isArray(list) || !list.length) {
        return null;
    }

    let sum = 0;

    list.forEach( item => {
        if (item && item.rating) {
            sum += Number(item.rating);
        }
    });

    return (Math.floor(sum * 10 / list.length) / 10)
};

export function lastSevenDaysAverage(list) {
    if (!list || !Array.isArray(list) || !list.length) {
        return {}
    }

    let dates = [];
    let sum = 0;
    let count = 0;

    for (let i = 0; i < list.length; i++) {
        let date = list[i].date;

        if (dates.indexOf(date) < 0) {
            dates.push(list[i].date);
        }

        sum += Number(list[i].rating);
        count++;

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

export function mapLogsToGraphData(logs) {
    if (!logs || !Array.isArray(logs) || !logs.length) {
        return null;
    }
    
    let graphData = [];

    for (let i = 0; i < logs.length; i++) {
        const { date, rating } = logs[i];
        
        graphData.push({
            date,
            rating
        });

        if (i === 20) {
            break;
        }
    };

    return graphData;
}

export function mapLogsToDaytimeStats(list) {
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
