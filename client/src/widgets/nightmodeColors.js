export function returnWhite(nightmode) {
    if (nightmode === true) {
        return {
            color: "#f2f2f2"
        }
    } else {
        return null
    }
}

export function returnBarStyle(nm) {
    if (nm === true) {
        return {  border: '1px solid #f2f2f2',
                backgroundColor: '#f2f2f2'}
    }
    return null;
}

export function returnLightGrey (nm) {
    if (nm === true) {
        return {
            color: '#f2f2f2'
        }
    }
    return null
}

export function returnNavbarStyle(nm) {
    if (nm === true) {
        return {
            backgroundColor: "#404040",
            color: "#ffffff"
        }
    }
    return null
}

export function returnDarkBackground(nm) {
    if (nm === true) {
        return {
            backgroundColor: "#404040"
        }
    }
    return null
}

export function dashboardButtonStyle(nm) {
    if (nm === true) {
        return {
            background: "#cccccc",
            color: "#0d0d0d"
        }
    }
}
//
export function ratingButtonStyle(nm) {
    if (nm === true) {
        return {
            background: "#cccccc",
            color: "#0d0d0d"
        }
    }
}

export function graphStroke(nm) {
    if (nm === true) {
        return {
            stroke: "#d2d2d2"
        }
    }
}